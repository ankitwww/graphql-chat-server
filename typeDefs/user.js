const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    members: [User]
  }

  type User {
    id: ID!
    name: String
    img: String
  }
`;
