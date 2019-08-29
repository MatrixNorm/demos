import {
  QueryRenderer, 
  graphql
} from 'react-relay'

import React from 'react'

import environment from './Environment'
import PostDetails from './PostDetails'

const AppQuery = graphql`
  query AppQuery($count: Int
                 $cursor: String) {
    postFeed(
      first: $count, 
      after: $cursor
    ) @connection(key: "PostFeed_postFeed") {
        edges {
          node {
            ...PostDetails_post
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
  }
`

const render = ({error, props}) => {
  console.log(props.postFeed)
  if (error) {
    return <div style={{color: "red"}}>Error: {error.message}</div>;
  }
  if (!props) {
    return <div>Loading...</div>
  }
  return (
    <div>
      {props.postFeed.edges
          .map(edge => <PostDetails post={edge.node} key={edge.cursor}/>)}
    </div>
  )
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