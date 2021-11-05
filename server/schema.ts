import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Query {
    hello: String!
    helloMessage: Message!
    helloRandom: Message!
  }

  type Message {
    id: ID!
    message: String
  }
`);

export const resolvers = {
  hello: () => 'Hello world!',
  helloMessage: () => ({ id: 'static', message: 'Hello world!' }),
  helloRandom: () => ({ id: 'random', message: Math.random().toString(36).substring(7) }),
};