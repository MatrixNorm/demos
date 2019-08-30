import {
  createFragmentContainer, 
  graphql
} from 'react-relay'
import React from 'react'

const PostDetails = props => {
  //console.log(props)
  return (
    <div>
      <h1>{props.post.title}</h1>
      <h2>{props.post.author.name}</h2>
    </div>
  )
}

export default createFragmentContainer(PostDetails, {
  post: graphql`
    fragment PostDetails_post on Post {
      title
      author {
        name
      }
    }
  `
})