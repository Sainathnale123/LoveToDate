const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers/resolvers');
const db = require('./db');
const { authenticateUser } = require('../src/graphql/resolvers/authMiddleware'); // Import your authentication middleware

const app = express();

const getUserFromToken = (req) => {
  const token = req.headers.authorization || '';
  // Your token verification code here
  // Return user information if the token is valid
  // Return null or throw an error if the token is invalid
  // For example:
  // return verifyToken(token);
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Attach the user to the context based on authentication
    const user = getUserFromToken(req); // Implement your token verification logic here
    return { user };
  },
});

async function startServer() {
  await server.start(); // Await the server start before applying middleware
  server.applyMiddleware({ app, path: '/graphql' }); // Use the correct path

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();


