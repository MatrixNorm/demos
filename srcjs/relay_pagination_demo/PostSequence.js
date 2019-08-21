import {
  createFragmentContainer, 
  graphql
} from 'react-relay'

import React from 'react'
import PostDetails from './PostDetails'

const PostSequence = props => {
  console.log(props)
  return (
    <div>
      {props.posts.map(edge => <PostDetails post={edge.node}/>)}
    </div>
  )
}

export default createFragmentContainer(PostSequence, {
  posts: graphql`
    fragment PostSequence_posts on PostConnection {
      edges {
        node {
          ...PostDetails_post
        }
      }
    }
  `
})