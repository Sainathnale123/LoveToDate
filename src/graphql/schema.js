const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    psychologyScore: Float
  }

  type AuthPayload {
    user: User
    token: String
  }

  type Token {
    token: String!
  }
  
  type PsychologyScalePrediction {
    user: User!
    score: Float!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
    getQuestions: [String!]!
  }

  type Mutation {
    registerUser(username: String!, email: String!, password: String!): AuthPayload
    loginUser(email: String!, password: String!): AuthPayload
    deleteUser(id: ID!): User
    updateUser(id: ID!, username: String!, email: String!, password: String!): User
    predictPsychologyScale(id: ID!, answers: [Int!]!): PsychologyScalePrediction!
  }
  
  # Optional: You can define additional queries or mutations here
`;

module.exports = typeDefs;



