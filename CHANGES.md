### Proposed Schema

- Part 2 of the problem - The app now has a notion of public and private forums.
- Key changes:
  - Forum Schema got new fields - "pendingMembers" & "isPrivate"
  - A new mutation "processMembershipRequest (input: requestInput)" - using this admin can approve/reject the joining request of given userId.

```json

{
    type Query {
        _: String
        availableForums: [ForumInfo]
        joinedForums: [Forum]
        forum(id: ID!): Forum
        members: [User]
    }

    type Mutation {
        _: String
        createForum(input: forumInput): Forum
        joinForum(id: ID!): Forum
        postMessage(input: msgInput): Message
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

    input forumInput {
        title: String
    }

    type Message {
        id: ID!
        text: String!
        timestamp: DateTime!
        user: User!
    }

    input msgInput {
        text: String
        forumId: String
    }

    type User {
        id: ID!
        name: String
        img: String
    }
}
```
