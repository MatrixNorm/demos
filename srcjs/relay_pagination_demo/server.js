import db from './database'

function _postFeedForward(first, after, posts) {
  let startIndex;

  if (after) {
    startIndex = posts.findIndex(p => p.id === after)
    if (startIndex < 0) {
      throw "Bad `after` cursor"
    }
  } else {
    startIndex = 0
  }
  const endIndex = Math.min(startIndex + first, posts.length - 1)
  return {startIndex, endIndex}
}

function _postFeedBackward(last, before, posts) {
  console.log(last, before, posts)
  let endIndex;

  if (before) {
    endIndex = posts.findIndex(p => p.id === before)
    if (endIndex < 0) {
      throw "Bad `before` cursor"
    }
  } else {
    endIndex = posts.length - 1
  }
  const startIndex = Math.max(endIndex - last, 0)
  return {startIndex, endIndex}
}

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
    postFeed: (_, {first, after, last, before}) => {
      console.log(first, after, last, before)

      const posts = Object.values(db.postsById)
      posts.sort((a, b) => a.createdAt < b.createdAt ? -1 : 1)

      let startIndex, endIndex;

      if (first) {
        ({startIndex, endIndex} = _postFeedForward(first, after, posts))
      }
      if (last) {
        ({startIndex, endIndex} = _postFeedBackward(last, before, posts))
      }
      const segment = posts.slice(startIndex, endIndex)
  
      const pageInfo = {
        hasNextPage: endIndex + 1 < posts.length,
        endCursor: segment[segment.length - 1].id,
        hasPreviousPage: posts[startIndex - 1] ? true : false,
        startCursor: posts[startIndex - 1]?.id
      }

      return {
        edges: segment.map(post => ({node: post, cursor: post.id})), 
        pageInfo
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

export default resolvers