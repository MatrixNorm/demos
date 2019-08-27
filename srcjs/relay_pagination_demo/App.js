import {
  QueryRenderer, 
  graphql
} from 'react-relay'

import React from 'react'

import environment from './Environment'
import PostSequence from './PostSequence'

const AppQuery = graphql`
  query AppQuery($count: Int
                 $cursor: String) {
    posts {
      ...PostSequence_conn @arguments(count: $count, cursor: $cursor)
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
  return <PostSequence posts={props.posts} />
}

const App = () => {
  return (
    <QueryRenderer
      query={AppQuery}
      environment={environment}
      variables={{count: 3}}
      render={render}/>
  )
}

export default App