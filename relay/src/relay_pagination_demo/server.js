// @flow

import db from './database'

// type NodeType = {
//   id: string
// }

type PostType = {
  id: string,
  title: string,
  createdAt: number
}

type PaginationType = {
  first: ?number, 
  after: ?string, 
  last: ?number, 
  before: ?string
}

function _postFeedForward(first: number, after: ?string, posts: PostType[]): [number, number] {
  /*
    posts can be generic NodeType[]
  
  */
  
  console.log(first, after, posts)
  let startIndexIncluding = 0

  if (after) {
    let afterIndex = posts.findIndex(p => p.id === after)
    if (afterIndex < 0) {
      throw "Bad `after` cursor"
    }
    startIndexIncluding = afterIndex + 1  
  }
  const endIndexExcluding = Math.min(startIndexIncluding + first, posts.length - 1)
  return [startIndexIncluding, endIndexExcluding]
}

function _postFeedBackward(last: number, before: ?string, posts: PostType[]): [number, number] {
  console.log(last, before, posts)
  let endIndexExcluding = posts.length

  if (before) {
    endIndexExcluding = posts.findIndex(p => p.id === before)
    if (endIndexExcluding < 0) {
      throw "Bad `before` cursor"
    }
  }
  const startIndexIncluding = Math.max(endIndexExcluding - last + 1, 0)
  return [startIndexIncluding, endIndexExcluding]
}

function xxx(startIndexIncluding, endIndexExcluding, posts) {
  const segment = posts.slice(startIndexIncluding, endIndexExcluding)
  
  const pageInfo = {
    hasNextPage: endIndexExcluding < posts.length - 1,
    endCursor: segment[segment.length - 1].id,
    hasPreviousPage: startIndexIncluding > 0,
    startCursor: segment[0].id
  }

  const edges = segment.map(post => ({node: post, cursor: post.id}))

  return {edges, pageInfo}
}

const resolvers = {
  Query: {
    node: (_: any, { id }: {id: string}) => {
      if (id.startsWith('post')) {
        return db.postsById[id]
      }
      if (id.startsWith('user')) {
        return db.usersById[id] 
      }
      return null
    },
    postFeed: (_: any, {first, after, last, before}: PaginationType) => {
      console.log(first, after, last, before)

      if ( !first && !last ) {
        return
      }

      const posts: PostType[] = Object.values(db.postsById)
      posts.sort((a, b) => a.createdAt < b.createdAt ? -1 : 1)

      let startIndexIncluding = 0, endIndexExcluding = 0;

      if (first) {
        [startIndexIncluding, endIndexExcluding] = _postFeedForward(first, after, posts)
      }
      if (last) {
        [startIndexIncluding, endIndexExcluding] = _postFeedBackward(last, before, posts)
      }
      return xxx(startIndexIncluding, endIndexExcluding, posts)   
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
      return db.usersById[post.authorId]
    }
  },
  User: {
    posts: (user: {id: string}) => {
      return Object.values(db.postsById)
        .filter(p => p.authorId == user.id)
    }
  }
}

export default resolvers