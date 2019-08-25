import {
  QueryRenderer, 
  graphql
} from 'react-relay'

import React from 'react'

import environment from './Environment'
import PostDetails from './PostDetails'

const AppQuery = graphql`
  query AppQuery($postId: ID!) {
    node(id: $postId) {
      ...PostDetails_post
    }
  }
`
const render = ({error, props}) => {
  console.log(props.post)
  if (error) {
    return <div style={{color: "red"}}>Error: {error.message}</div>;
  }
  if (!props) {
    return <div>Loading...</div>
  }
  return <PostDetails post={props.node} />
}

const App = () => {
  return (
    <QueryRenderer
      query={AppQuery}
      environment={environment}
      variables={{postId: "post1"}}
      render={render}/>
  )
}

export default App