// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveDrink(input: savedDrink!): User
        removeDrink(drinkId: String!): User
    }

    type User {
        _id: ID!
        username: String
        email: String
        drinkCount: Int
        savedDrinks: [Drink]
    }

    type Drink {
        drinkId: String
        ingredients: [String]
        instructions: String
        title: String
        image: String
    }

    input savedDrink {
        instructions: String
        title: String
        drinkId: String
        image: String
        ingredients: [String]
    }

    type Auth {
        token: ID!
        user: User
    }
`;

// export the typeDefs
module.exports = typeDefs;