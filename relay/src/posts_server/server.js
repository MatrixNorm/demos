// @flow

import db from './database'

import type { Index as DatabaseIndex } from './database'
import type { PostOrdering } from './graphql.types'
import { PostOrderingValues } from './graphql.types'

const x: PostOrdering = 'createdAt3333'
console.log(x)

export function sum(x: number, y: number) {
  return x + y
}

function _paginate({itemId, count, orderBy, forward, index}: 
                   {itemId: ?string, count: number, orderBy: PostOrdering, forward: boolean, index: DatabaseIndex}) {
  console.log(itemId, count, orderBy, forward)

  const { 
    items: nodes, 
    hasNext, 
    hasPrev } = index.get({ itemId, count, forward })

  const edges = nodes.map(node => ({node, cursor: encodeCursor(node.id, orderBy)}))

  const pageInfo = {
    hasNextPage: hasNext,
    endCursor: edges[edges.length - 1]?.cursor,
    hasPreviousPage: hasPrev,
    startCursor: edges[0]?.cursor
  }

  return { edges, pageInfo }
}

function paginate({ itemId, count, orderBy, forward}: { itemId: ?string, count: number, orderBy: PostOrdering, forward: boolean}) {
  const index = db.posts.indexes[orderBy] // XXX opaque type
  return _paginate({ itemId, count, orderBy, forward, index })
}

function decodeCursor(cursor: string): [string, PostOrdering] {
  const [itemId, orderBy] = cursor.split('@')
  // WTF we have PostOrderingValues after all
  if ( orderBy === 'createdAt' || orderBy === 'viewsCount' ) {
    return [itemId, orderBy]
  }
  throw `Invalid orderBy`
}

function encodeCursor(nodeId: string, orderBy: PostOrdering) {
  return `${nodeId}@${orderBy}`
}

const resolvers = {
  Query: {
    node: (_, { id }) => {
      /*
        type Query {
          node(id: ID!): Node
        }
      */
      if (id.startsWith('post')) {
        return db.posts.byId[id]
      }
      if (id.startsWith('user')) {
        return db.users.byId[id] 
      }
      return null
    },
    postFeed: (_, {first, after, last, before, orderBy}) => {
      console.log(first, after, last, before, orderBy)
      if ( first ) {
        if ( after ) {
          const [postId, orderBy] = decodeCursor(after)
          return paginate({ itemId: postId, count: first, orderBy, forward: true })
        }
        if ( orderBy ) {
          return paginate({ itemId: null, count: first, orderBy, forward: true })
        }
        throw `Unable to paginate`
      }

      if ( last ) {
        if ( before ) {
          const [postId, orderBy] = decodeCursor(before)
          return paginate({ itemId: postId, count: first, orderBy, forward: false })
        }
        if ( orderBy ) {
          return paginate({ itemId: null, count: first, orderBy, forward: false })
        }
        throw `Unable to paginate`
      }
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
      return db.users.byId[post.authorId]
    }
  },
  User: {
    posts: (user) => {
      return Object.values(db.posts.byId).filter(p => p.authorId == user.id)
    }
  }
}

export default resolvers