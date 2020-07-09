# GraphQL based API for chat app

### How to run the code

- Add .env file (Refer .env.example for required fields)
- Install dependencies

```js
 npm install

```

- Start graphql server

```js
 npm run dev
```

### Schema

```js

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
