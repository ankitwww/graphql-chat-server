const uuid = require("uuid");

module.exports = {
  Mutation: {
    postMessage: (_, { input }, { Fixure_Data, USER_ID }) => {
      const message = {
        id: uuid.v4(),
        text: input.text,
        forumId: input.forumId,
        timestamp: new Date().toISOString(),
        userId: USER_ID,
      };
      let thisForum = Fixure_Data.forums.find(
        (forum) => forum.id == input.forumId
      );

      //Message will be only added to forum if the user is already a member of
      //the given forum
      if (thisForum.members.indexOf(USER_ID) > -1) {
        thisForum.messages.push(message.id);
        Fixure_Data.messages.push(message);
        return message;
      } else {
        return null;
      }
    },
  },
  Message: {
    user: (parent, __, { Fixure_Data }) => {
      try {
        const user = Fixure_Data.users.find(
          (user) => user.id === parent.userId
        );
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
