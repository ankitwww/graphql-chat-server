const { gql } = require("apollo-server-express");

const forumTypeDefs = require("./forum");
const messageTypeDefs = require("./message");
const userTypeDefs = require("./user");

const typeDefs = gql`
  scalar Date

  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;

module.exports = [typeDefs, forumTypeDefs, messageTypeDefs, userTypeDefs];
