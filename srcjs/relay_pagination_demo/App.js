import {
  QueryRenderer, 
  graphql
} from 'react-relay'
import React from 'react'
import environment from './Environment'
import PostFeed from './PostFeed'

const AppQuery = graphql`
  query AppQuery($first: Int
                 $after: String
                 $last: Int
                 $before: String) {
    ...PostFeed_posts @arguments(first: $first,
                                 after: $after,
                                 last: $last,
                                 before: $before)
  }
`

const render = ({error, props}) => {
  //console.log(props)
  if (error) {
    return <div style={{color: "red"}}>Error: {error.message}</div>;
  }
  if (!props) {
    return <div>Loading...</div>
  }
  return (<PostFeed posts={props} />)
}

const App = () => {
  return (
    <QueryRenderer
      query={AppQuery}
      environment={environment}
      variables={{first: 3, after: null}}
      render={render}/>
  )
}

export default App