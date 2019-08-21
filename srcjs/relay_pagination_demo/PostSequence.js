import {
  createPaginationContainer, 
  graphql
} from 'react-relay'

import React from 'react'
import PostDetails from './PostDetails'

const PostSequence = props => {
  console.log(props)
  return (
    <div>
      {props.posts.edges.map(edge => <PostDetails post={edge.node}/>)}
    </div>
  )
}

export default createPaginationContainer(PostSequence, {
  posts: graphql`
    fragment PostSequence_posts on Query {
      posts(
        first: $count
        after: $cursor
      ) @connection(key: "PostSequence_posts") {
          edges {
            node {
              ...PostDetails_post
            }
          }
        }  
      }
    `
})