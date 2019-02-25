const express = require('express')
const app = express()
const graphQLHTTP = require('express-graphql')
const { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLInt } = require('graphql')

const User = new GraphQLObjectType({
    name: "UserType",
    fields: {
        name: { type: GraphQLNonNull(GraphQLString) },
        surname: { type: GraphQLNonNull(GraphQLString) },
        isFacebookWatchingYou: { type: GraphQLBoolean }
    }
})

const Book = new GraphQLObjectType({
    name: "BookType",
    fields: {
        title: { type: GraphQLNonNull(GraphQLString) },
        author: { type: GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLNonNull(GraphQLString) },
        available: { type: GraphQLNonNull(GraphQLInt) }
    }
})

const Schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "QueryType",
        fields: {
            user: {
                type: User
            },
            book: {
                type: Book
            }
        }
    })
})

// Define how to gt your data
const Resolvers = {
    user() {
        return {
            name() { return "Joe" },
            surname() { return "Doe" },
            isFacebookWatchingYou: true
        }
    },
    book() {
        return {
            title() { return "East of Eden" },
            author() { return "John Steinbeck" },
            genre() { return "Literary Fiction" },
            available() { return 3 }
        }
        
    }
}

const Query = `
    query {
        user {
            name
            surname
            isFacebookWatchingYou
        },
        book {
            title
            author
            genre
            available
        }
    }
`

graphql(Schema, Query, Resolvers)
    .then(res => console.log(res))