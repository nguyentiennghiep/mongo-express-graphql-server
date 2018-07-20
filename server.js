var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const uuidv4 = require('uuid/v4');
// import graphqlHTTP from 'express-graphql'
var mongoose = require('mongoose');
var app = express();
var productModel = require('./models/productModel');

mongoose.Promise = global.Promise;

var schema = buildSchema(`
    type Product {
        _id: ID!
        name: String
        price: Int
        status: Boolean
    }

    input CreateProductInput{
        name: String
        price: Int
        status: Boolean
    }

    type Mutation{
        createProduct(input: CreateProductInput!) : Product
        deleteProduct(_id:ID!) : Product
        updateProduct(_id:ID!,input : CreateProductInput) : Product
    }

    type Query {
        listProducts: [Product]
    }
`);


var root = {
    listProducts: () => {
        var queryProducts = productModel.find().exec();
        console.log(queryProducts);
        return queryProducts;
    },
    createProduct: ({ input }) => {
        var product = new productModel(
            {
                name: input.name,
                price: input.price,
                status: input.status
            }
        );
        product.save();
        return product;
    },
    deleteProduct: ({ _id }) => {
        var dProduct = productModel.findByIdAndRemove(_id).exec();
        console.log(dProduct);
        return dProduct;
    },
    updateProduct: ({ _id, input }) => {
        var newProduct = {
            _id: _id,
            name: input.name,
            price: input.price,
            status: input.status
        }

        productModel.findByIdAndUpdate(_id, {
            name: input.name,
            price: input.price,
            status: input.status
        }).exec();
        return newProduct;
    }
}


app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}
));


mongoose.connect('mongodb://127.0.0.1:27017/local')
var db = mongoose.connection;
db.on('error', () => { console.log('---FAILED to connect to mongoose') })
db.once('open', () => {
    console.log('+++Connected to mongoose')
})

console.log(db.Connection);


var prod = new productModel({
    id: uuidv4(),
    name: 'oppa',
    price: 200,
    status: false
})

app.listen(4000, () => {
    console.log('server is listening on port 4000');
});

