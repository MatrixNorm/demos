import {
  QueryRenderer, 
  graphql
} from 'react-relay'

import React from 'react'

import environment from './Environment'
import PostSequence from './PostSequence'

const AppQuery = graphql`
  query AppQuery {
    posts {
      ...PostSequence_posts
    }
  }
`

const render = ({error, props}) => {
  console.log(props.posts)
  if (error) {
    return <div style={{color: "red"}}>Error: {error.message}</div>;
  }
  if (!props) {
    return <div>Loading...</div>
  }
  return <PostSequence post={props.posts} />
}

const App = () => {
  return (
    <QueryRenderer
      query={AppQuery}
      environment={environment}
      variables={{}}
      render={render}/>
  )
}

export default App