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
        fields: {
            user: {
                type: User
            }
        }
    })
})

const Resolvers = {
    user() {
        return {
            name() {
                return new Promise(resolve => {
                    setTimeout(() => resolve("John"), 2000)
                })
            },
            surname() {
                return new Promise(resolve => {
                    setTimeout(() => resolve("Doe"), 3000)
                })
            }
        }
    }
}

const Query = `
    query {
        user {
            name
            surname
        }
    }
`

graphql(Schema, Query, Resolvers)
    .then(res => console.log(res))