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
        after: props.posts.postFeed.pageInfo.endCursor,
        last: null,
        before: null
      },
      null,
      () => console.log('next done!'))
  }

  function goPrev() {
    console.log(props)
    props.relay.refetch(
      {
        first: null,
        after: null,
        last: 3,
        before: props.posts.postFeed.pageInfo.startCursor
      },
      null,
      () => console.log('prev done!'))
  }

  return (
    <div>
      <div>
        {props.posts.postFeed.edges
            .map(edge => <PostDetails post={edge.node}
                                      // XXX 
                                      key={edge.node.__id}/>)}
      </div>
      <button onClick={goPrev}>PREV</button>
      <button onClick={goNext}>NEXT</button>
    </div>
  )
}
//@connection(key: "PostFeed_postFeed")
export default createRefetchContainer(
  postFeed, 
  {
    posts: graphql`
      fragment PostFeed_posts on Query 
        @argumentDefinitions(
          first: { type: "Int" },
          after: { type: "String" },
          last:  { type: "Int" },
          before: { type: "String" }
        ){
        postFeed(
          first: $first, 
          after: $after,
          last: $last,
          before: $before
        ) {
          edges {
            node {
              ...PostDetails_post
            }
          }
          pageInfo {
            hasNextPage
            endCursor
            hasPreviousPage
            startCursor
          }
        }
      }
    `
  },
  graphql`
    query PostFeedRefetchQuery(
      $first: Int
      $after: String
      $last: Int
      $before: String) {

      ...PostFeed_posts @arguments(first: $first,
                                   after: $after,
                                   last: $last,
                                   before: $before)
    }  
  `
)