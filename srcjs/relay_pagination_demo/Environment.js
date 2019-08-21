import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime'

import { graphqlSync } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'

const db = {}

db.postsById = {
  "3.14": {id: "3.14", title: "Ocaml vs Haskell", authorId: "df4T"}
}

db.usersById = {
  "df4T": {id: "df4T", name: "Boris"}
}

import typeDefs from 'raw-loader!./schema.graphql'

const resolvers = {
  Query: {
    post: (_, args) => {
      // how to check if response conforms this the GQL schema ???
      return db.postsById[args.id]
    }
  },
  Post: {
    author: (post) => {
      return db.usersById[post.authorId]
    }
  }
}

const schema = makeExecutableSchema({typeDefs, resolvers})
const store = new Store(new RecordSource())

const network = Network.create((operation, variables) => {
  console.log(schema)
  console.log(operation.text, variables)
  const resp = graphqlSync(schema, operation.text, {}, undefined, variables)
  console.log(resp)
  return resp
})

const environment = new Environment({network, store})

export default environment