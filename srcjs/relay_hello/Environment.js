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
  "post1": {id: "post1", title: "Baked eggs", authorId: "author2"},
  "post2": {id: "post2", title: "Clojure tutorial", authorId: "author1"},
  "post3": {id: "post3", title: "Ocaml vs Haskell", authorId: "author1"}
}

db.usersById = {
  "author1": {id: "author1", name: "Boris"},
  "author2": {id: "author2", name: "John Cook"}
}

import typeDefs from 'raw-loader!./schema.graphql'

const resolvers = {
  Query: {
    node: (_, args, x) => {
      console.log(_, args, db.postsById[args.id], x)
      return db.postsById[args.id]
    },
    // post: (_, args) => {
    //   // how to check if response conforms this the GQL schema ???
    //   return db.postsById[args.id]
    // }
  },
  Node: {
    __resolveType(node) {
      if (node.id.startsWith('post')) {
       return 'Post' 
      }
      return null
    }
  },
  Post: {
    author: (post) => {
      console.log(db.usersById[post.authorId])
      return db.usersById[post.authorId]
    }
  }
}

const schema = makeExecutableSchema({typeDefs, resolvers})
const store = new Store(new RecordSource())

const network = Network.create((operation, variables) => {
  console.log(operation.text, variables)
  const resp = graphqlSync(schema, operation.text, {}, undefined, variables)
  console.log(resp)
  return resp
})

const environment = new Environment({network, store})

export default environment