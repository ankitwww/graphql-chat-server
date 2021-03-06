const uuid = require("uuid");

module.exports = {
  Query: {
    availableForums: (_, __, { Fixure_Data, USER_ID }) => {
      let availableForums = Fixure_Data.forums.filter((forum) => {
        let isMember = forum.members.indexOf(USER_ID) >= 0;
        return !isMember;
      });

      //Send only id and title - No need of members and messages
      return availableForums.map((forum) => {
        return {
          id: forum.id,
          title: forum.title,
        };
      });
    },

    joinedForums: (_, __, { Fixure_Data, USER_ID }) => {
      return Fixure_Data.forums.filter((forum) => {
        let isMember = forum.members.indexOf(USER_ID) >= 0;
        return isMember;
      });
    },

    forum: (_, { id }, { Fixure_Data }) => {
      return Fixure_Data.forums.find((forum) => forum.id == id);
    },
  },
  Mutation: {
    createForum: (_, { input }, { Fixure_Data, USER_ID }) => {
      const forum = { ...input, id: uuid.v4(), members: [], messages: [] };
      const thisUser = Fixure_Data.users.find((u) => u.id === USER_ID);
      //When the forum is created - the user gets added to it by default
      forum.members.push(thisUser.id);
      Fixure_Data.forums.push(forum);
      return forum;
    },
    joinForum: (_, { id }, { Fixure_Data, USER_ID }) => {
      const thisForum = Fixure_Data.forums.find((forum) => forum.id === id);

      //We will only add the member if it is not present already
      if (thisForum.members.indexOf(USER_ID) === -1) {
        thisForum.members.push(USER_ID);
      }
      return thisForum;
    },
  },
  Forum: {
    messages: (parent, _, { Fixure_Data }) => {
      try {
        const messages = Fixure_Data.messages.filter(
          (msg) => msg.forumId === parent.id
        );
        return messages.sort((a, b) => (b.timestamp > a.timestamp ? 1 : -1));
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    members: (parent, _, { Fixure_Data }) => {
      try {
        const users = Fixure_Data.users.filter(
          (user) => parent.members.indexOf(user.id) > -1
        );
        return users;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
