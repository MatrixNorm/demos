import {
  createRefetchContainer, 
  graphql
} from 'react-relay'
import React from 'react'
import PostDetails from './PostDetails'

const postFeed = (props) => {
  console.log(props)
  function goNext() {
    console.log(props)
    props.relay.refetch(
      {
        first: 3,
        after: props.posts.postFeed.pageInfo.endCursor
      },
      null,
      () => console.log('done!'))
  }

  return (
    <div>
      <div>
        {props.posts.postFeed.edges
            .map(edge => <PostDetails post={edge.node} 
                                      key={edge.cursor}/>)}
      </div>
      <button onClick={goNext}>NEXT</button>
    </div>
  )
}

export default createRefetchContainer(
  postFeed, 
  {
    posts: graphql`
      fragment PostFeed_posts on Query 
        @argumentDefinitions(
          first: { type: "Int!" },
          after: { type: "String" }
        ){
        postFeed(
          first: $first, 
          after: $after
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
  },
  graphql`
    query PostFeedRefetchQuery($first: Int!, $after: String) {
      ...PostFeed_posts @arguments(first: $first, after: $after)
    }  
  `
)