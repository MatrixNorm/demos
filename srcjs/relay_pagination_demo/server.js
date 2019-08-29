import db from './database'

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
    postFeed: (_, args) => {
      console.log(args)
      const posts = Object.values(db.postsById)
      posts.sort((a, b) => a.createdAt < b.createdAt ? -1 : 1)

      let zzz, startIndex;

      if (args.after) {
        startIndex = posts.findIndex(args.after)
        if (startIndex > 0) {
          zzz = posts.slice(startIndex, args.first)
        }
        // XXX error: invalid cursor
        zzz = []
      } else {
        startIndex = 0
        zzz = posts.slice(0, args.first)
      }

      const pageInfo = {
        hasNextPage: startIndex + args.first < posts.length,
        endCursor: posts[startIndex + args.first].id
      }

      return {
        edges: zzz.map(post => ({node: post, cursor: post.id})), 
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