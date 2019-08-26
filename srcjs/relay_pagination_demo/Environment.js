import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime'

import { graphqlSync } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'

import db from './database'
import typeDefs from 'raw-loader!./schema.graphql'

const resolvers = {
  Query: {
    node: (_, args) => {
      const { id } = args;
      if (id.startsWith('post')) {
        return db.postsById[id]
      }
      if (id.startsWith('user')) {
        return db.usersById[id] 
      }
      return null
    },
    posts: (_, {after, first}) => {
      console.log(after, first)
      return Object.values(db.postsById).slice(0, first)
    }
  },
  Node: {
    __resolveType(node) {
      if (node.id.startsWith('post')) {
        return 'Post' 
      }
      if (node.id.startsWith('user')) {
        return 'User' 
      }
      return null
    }
  },
  Post: {
    author: (post) => {
      return db.usersById[post.authorId]
    }
  },
  User: {
    posts: (user) => {
      return Object.values(db.postsById)
        .filter(p => p.authorId == user.id)
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