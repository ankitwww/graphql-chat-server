const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const dotEnv = require("dotenv");

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const data = require("./fixtures.json");

// set env variables
dotEnv.config();

const app = express();
app.use(express.json());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return {
      Fixure_Data: data,
      USER_ID: "1", //assuming here that the user/client is already authenticated and has an ID
    };
  },
});

apolloServer.applyMiddleware({ app, path: "/graphql" });

const PORT = process.env.PORT;

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
