var graphql = require('graphql');
var productType = require('./../types/product');

var listProduct = new graphql.GraphQLObjectType(
    {
        name: 'Query',
        fields: () => ({
            products : {
                type : new GraphQLList(userType),
                resolve: () => {
                    const users = UserModel.find().exec()
                    if (!users) {
                      throw new Error('Error')
                    }
                    return users
                  }
            }   
        })
    }
);
module.exports = productType;