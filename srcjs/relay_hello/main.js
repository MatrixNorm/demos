import {
  QueryRenderer, 
  graphql
} from 'react-relay'

import React from 'react'
import ReactDOM from 'react-dom'

import environment from './Environment'
import PostDetails from './PostDetails'

const PostQuery = graphql`
  query mainQuery {
    post {
      ...PostDetails_post
    }
  }
`

const render = ({error, props}) => {
  console.log(props)
  if (error) {
    return <div>Error: {error}</div>;
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
      variables={{}}
      render={render}
    />
  )
}

const body = document.getElementsByTagName('body')[0]
const appContainer = document.createElement('div')
body.insertBefore(appContainer, body.firstChild)
ReactDOM.render(<App />, appContainer);
