const { GraphQLDateTime } = require("graphql-iso-date");

const forumResolver = require("./forum");
const messageResolver = require("./message");

const customDateScalarResolver = {
  Date: GraphQLDateTime,
};

module.exports = [forumResolver, messageResolver, customDateScalarResolver];
