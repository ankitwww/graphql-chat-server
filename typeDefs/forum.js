const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    availableForums: [ForumInfo]
    joinedForums: [Forum]
    forum(id: ID!): Forum
  }

  extend type Mutation {
    createForum(input: forumInput): Forum
    joinForum(id: ID!): Forum
  }

  input forumInput {
    title: String
  }

  type Forum {
    id: ID!
    title: String!
    messages: [Message]
    members: [User]
  }

  type ForumInfo {
    id: ID!
    title: String!
  }
`;
