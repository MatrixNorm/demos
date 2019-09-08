// @flow

import db from './database'

// type NodeType = {
//   id: string
// }

// type PostType = {
//   id: string,
//   title: string,
//   createdAt: number
// }

type PaginationInputType = {
  first: ?number, 
  after: ?string, 
  last: ?number, 
  before: ?string,
  orderBy: ?string
}

type PaginationDirectionType =
  | 'forward'
  | 'backward'

export function sum(x: number, y: number) {
  return x + y
}

function _paginate({itemId, count, orderBy, direction, index}) {
  console.log(itemId, count, orderBy, direction)

  const { 
    items: nodes, 
    hasNext, 
    hasPrev } = index.get({ direction, itemId, count })

  const edges = nodes.map(node => ({node, cursor: encodeCursor(node.id, orderBy)}))

  const pageInfo = {
    hasNextPage: hasNext,
    endCursor: edges[edges.length - 1]?.cursor,
    hasPreviousPage: hasPrev,
    startCursor: edges[0]?.cursor
  }

  return { edges, pageInfo }
}

function paginate({ cursor, count, orderBy, direction}: 
                  {cursor: ?string, 
                   count: number, 
                   orderBy: string, 
                   direction: PaginationDirectionType}) {
  let itemId = null;
  if ( cursor ) {
    [itemId, orderBy] = decodeCursor(cursor)
  }
  const index = db.posts.indexes[orderBy]
  return _paginate({ itemId, count, orderBy, direction, index })
}

function decodeCursor(cursor: string) {
  return cursor.split('@')
}

function encodeCursor(nodeId, orderBy) {
  return `${nodeId}@${orderBy}`
}

const resolvers = {
  Query: {
    node: (_: any, { id }: {id: string}) => {
      if (id.startsWith('post')) {
        return db.posts.byId[id]
      }
      if (id.startsWith('user')) {
        return db.users.byId[id] 
      }
      return null
    },
    postFeed: (_: any, {first, after, last, before, orderBy}: PaginationInputType) => {
      console.log(first, after, last, before)

      // XXX 
      orderBy = 'createdAt'

      if ( first ) {
        if ( !after && !orderBy) {
          throw `Unable to paginate`
        }
        return paginate({ cursor: after, count: first, orderBy, direction: 'forward' })
      }

      if ( last ) {
        if ( !before && !orderBy) {
          throw `Unable to paginate`
        }
        return paginate({ cursor: before, count: last, orderBy, direction: 'backward' })
      }
    }
  },
  Node: {
    __resolveType(node: {id: string}) {
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
    author: (post: {authorId: string}) => {
      return db.users.byId[post.authorId]
    }
  },
  User: {
    posts: (user: {id: string}) => {
      return Object.values(db.posts.byId).filter(p => p.authorId == user.id)
    }
  }
}

export default resolvers