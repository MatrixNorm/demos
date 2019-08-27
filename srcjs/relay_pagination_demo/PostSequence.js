import {
  createPaginationContainer, 
  graphql
} from 'react-relay'

import React from 'react'
import PostDetails from './PostDetails'

const PostSequence = props => {
  console.log(props)
  return (
    <div>
      {props.posts.edges.map(edge => <PostDetails post={edge.node}/>)}
    </div>
  )
}

export default createPaginationContainer(PostSequence, {
  conn: graphql`
    fragment PostSequence_conn on PostSeq 
    @argumentDefinitions(
      count: {type: "Int"}
      cursor: {type: "String"}
    ) {
      conn(
        first: $count
        after: $cursor
      ) @connection(key: "PostSequence_conn") {
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
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      console.log(props)
      return props.posts.conn;
    },
    getVariables(props, {count, cursor}, fragmentVariables) {
      console.log('getVariables', count)
      return { count, cursor };
    }
  })