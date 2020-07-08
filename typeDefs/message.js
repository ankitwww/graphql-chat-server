const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Mutation {
    postMessage(input: msgInput): Message
  }

  type Message {
    id: ID!
    text: String!
    timestamp: Date!
    user: User!
  }

  input msgInput {
    text: String
    forumId: String
  }
`;
