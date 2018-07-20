var graphql = require('graphql');

var productType = new graphql.GraphQLObjectType(
    {
        name: 'Product',
        fields: () => ({
            id: { type: new graphql.GraphQLNonNull(String) },
            name: { type: graphql.GraphQLString },
            price: { type: graphql.GraphQLInt },
            status: { type: graphql.GraphQLBoolean }
        })
    }
);
module.exports = productType;