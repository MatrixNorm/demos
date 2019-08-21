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
  "1": {id: "1", title: "Baked eggs", authorId: "2"},
  "2": {id: "2", title: "Clojure tutorial", authorId: "1"},
  "3": {id: "3", title: "Ocaml vs Haskell", authorId: "1"}
}

db.usersById = {
  "1": {id: "1", name: "Boris"},
  "2": {id: "2", name: "John Cook"}
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