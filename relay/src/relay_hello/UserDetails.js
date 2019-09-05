import {
  createFragmentContainer, 
  graphql
} from 'react-relay'

import React from 'react'

const UserDetails = props => {
  console.log(props)
  return (
    <div>
      <h1>{props.user.name}</h1>
      <ul>
        {props.user.posts.map((post, j) => (
          <li key={j}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default createFragmentContainer(UserDetails, {
  user: graphql`
    fragment UserDetails_user on User {
      name
      posts {
        title
      }
    }
  `
})