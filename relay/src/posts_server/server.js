import db from './database'

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

function paginate({ cursor, count, orderBy, direction}) {
  if ( cursor ) {
    const [itemId, orderBy] = decodeCursor(cursor)
    const index = db.posts.indexes[orderBy]
    return _paginate({ itemId, count, orderBy, direction, index })
  }
  if ( orderBy ) {
    const index = db.posts.indexes[orderBy]
    return _paginate({ itemId: null, count, orderBy, direction, index })
  }
  throw `unable to paginte: provide either 'cursor' or 'orderBy'`
}

function decodeCursor(cursor: string) {
  return cursor.split('@')
}

function encodeCursor(nodeId, orderBy) {
  return `${nodeId}@${orderBy}`
}

const resolvers = {
  Query: {
    node: (_, { id }) => {
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