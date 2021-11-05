import express from 'express'
import { graphqlHTTP } from 'express-graphql'
// @ts-ignore
import cors from 'cors'

import { schema, resolvers } from './schema'

const app = express();
app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.listen(3001);
console.log('Running a GraphQL API server at http://localhost:3001/graphql');