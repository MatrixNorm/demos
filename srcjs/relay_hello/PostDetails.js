import {
  createFragmentContainer, 
  graphql
} from 'react-relay'

import React from 'react'

const PostDetails = post => {
  return (
    <div>
      <h1>post.title</h1>
      <h2>post.id</h2>
    </div>
  )
}

export default createFragmentContainer(PostDetails, {
  post: graphql`
    fragment PostDetails_post on Post {
      id,
      title
    }
  `
})