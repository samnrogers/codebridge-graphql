const { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean } = require('graphql')

const User = new GraphQLObjectType({
    name: "UserType",
    fields: {
        name: {
            type: GraphQLNonNull(GraphQLString)
        },
        surname: {
            type: GraphQLNonNull(GraphQLString)
        },
        isFacebookWatchingYou: { type: GraphQLBoolean }
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

// Define how to gt your data
const Resolvers = {
    user() {
        return {
            name() {
                // return new Promise(resolve => {
                //     setTimeout(() => resolve("John"), 2000)
                // })
                return "Joe"
            },
            surname() {
                // return new Promise(resolve => {
                //     setTimeout(() => resolve("Doe"), 3000)
                // })
                return "Doe"
            },
            isFacebookWatchingYou: true
        }
    }
}

const Query = `
    query {
        user {
            name
            surname
            isFacebookWatchingYou
        }
    }
`

graphql(Schema, Query, Resolvers)
    .then(res => console.log(res))