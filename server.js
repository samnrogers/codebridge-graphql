const { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql')

const User = new GraphQLObjectType({
    name: "UserType",
    fields: {
        name: {
            type: GraphQLNonNull(GraphQLString)
        },
        surname: {
            type: GraphQLNonNull(GraphQLString)
        }
    }
})

const Schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "QueryType",
        fields: { type: User }
    })
})

const Resolvers = {
    user() {
        return {
            name: "John",
            surname: "Doe"
        }
    }
}

const Query = `
    query {
        user {
            name
        }
    }
`

graphql(Schema, Query, Resolvers)
    .then(res => console.log(res))