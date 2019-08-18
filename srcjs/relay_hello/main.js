import {
  QueryRenderer, 
  graphql
} from 'react-relay'

import React from 'react'
import ReactDOM from 'react-dom'

import environment from './Environment'
import PostDetails from './PostDetails'

const PostQuery = graphql`
  query mainQuery($postId: ID!) {
    post(id: $postId) {
      ...PostDetails_post
    }
  }
`

const render = ({error, props}) => {
  if (error) {
    return <div style={{color: "red"}}>Error: {error.message}</div>;
  }
  if (!props) {
    return <div>Loading...</div>
  }
  return <PostDetails post={props.post} />
}

const App = () => {
  return (
    <QueryRenderer
      query={PostQuery}
      environment={environment}
      variables={{postId: "3.14"}}
      render={render}/>
  )
}

const body = document.getElementsByTagName('body')[0]
const appContainer = document.createElement('div')
body.insertBefore(appContainer, body.firstChild)
ReactDOM.render(<App />, appContainer);
