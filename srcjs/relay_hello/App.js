import {
  QueryRenderer, 
  graphql
} from 'react-relay'

import React from 'react'

import environment from './Environment'
import PostDetails from './PostDetails'
import UserDetails from './UserDetails'

const AppQuery = graphql`
  query AppQuery($postId: ID!, $userId: ID!) {
    post: node(id: $postId) {
      ...PostDetails_post
    }

    user: node(id: $userId) {
      ...UserDetails_user
    }
  }
`
const render = ({error, props}) => {
  console.log(props)
  if (error) {
    return <div style={{color: "red"}}>Error: {error.message}</div>;
  }
  if (!props) {
    return <div>Loading...</div>
  }
  return (<div>
      <PostDetails post={props.post}/>
      <UserDetails user={props.user} />
    </div>)
}

const App = () => {
  return (
    <QueryRenderer
      query={AppQuery}
      environment={environment}
      variables={{postId: "post1", userId: "user1"}}
      render={render}/>
  )
}

export default App