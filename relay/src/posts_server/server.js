// @flow

import db, { getIndex } from './database'

import type { Node, PostOrdering, QueryPostFeedArgs, QueryNodeArgs } from './graphql.types'
import { PostOrderingValues } from './graphql.types'

const x: PostOrdering = 'createdAt33'
console.log(x)

export function sum(x: number, y: number) {
  return x + y
}

function paginate({itemId, count, orderBy}: {itemId: ?string, count: number, orderBy: PostOrdering}) {
  console.log(itemId, count, orderBy)
  const { 
    items: nodes, 
    hasNext, 
    hasPrev } = getIndex(orderBy).get({ itemId, count })

  const edges = nodes.map(node => ({node, cursor: encodeCursor(node.id, orderBy)}))

  const pageInfo = {
    hasNextPage: hasNext,
    endCursor: edges[edges.length - 1]?.cursor,
    hasPreviousPage: hasPrev,
    startCursor: edges[0]?.cursor
  }

  return { edges, pageInfo }
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
    node: (_: mixed, { id }: QueryNodeArgs) => {
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
    }
  },
  postFeed: (_: mixed, args: QueryPostFeedArgs) => {
    //console.log(args)
    const {first, after, last, before, orderBy} = args

    let count, cursor;

    if ( first ) {
      count = first
      cursor = after
    } else if ( last ) {
      count = (-1) * last
      cursor = before
    } else {
      throw `Unable to paginate ${args.toString()}`
    }

    if ( cursor ) {
      const [postId, orderBy] = decodeCursor(cursor)
      return paginate({ itemId: postId, count, orderBy })
    }
    if ( orderBy ) {
      return paginate({ itemId: null, count, orderBy })
    }
    throw `Unable to paginate ${args.toString()}`
  },
  Node: {
    __resolveType(node: Node) {
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
    author: (post: mixed) => {
      return db.users.byId[post.authorId]
    }
  },
  User: {
    posts: (user: mixed) => {
      return Object.values(db.posts.byId).filter(p => p.authorId == user.id)
    }
  }
}

export default resolvers