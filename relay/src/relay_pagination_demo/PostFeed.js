// @flow

import {
  createRefetchContainer, 
  graphql,
  type RelayProp
} from 'react-relay'

import React from 'react'
import PostDetails from './PostDetails'

import type { PostFeed_posts as PostFeedType } from './__generated__/PostFeed_posts.graphql'

type Props = {|
  +relay: RelayProp,
  +posts: PostFeedType,
|}

const postFeed = ({relay, posts: {postFeed}}: Props) => {

  function goNext() {

    if ( !postFeed ) {
      return
    }

    relay.refetch(
      {
        first: 3,
        after: postFeed.pageInfo.endCursor,
        last: null,
        before: null,
        orderBy: null,
      },
      null,
      () => console.log('next done!'))
  }

  function goPrev() {

    if ( !postFeed ) {
      return
    }

    relay.refetch(
      {
        first: null,
        after: null,
        last: 3,
        before: postFeed.pageInfo.startCursor,
        orderBy: null,
      },
      null,
      () => console.log('prev done!'))
  }

  const nodes = 
    postFeed && postFeed.edges
      ? postFeed.edges
          .filter(Boolean)
          .map(edge => edge.node)
          .filter(Boolean)
      : [];

  const hasPrev = postFeed?.pageInfo?.hasPreviousPage
  const hasNext = postFeed?.pageInfo?.hasNextPage

  return (
    <div>
      <div>
        {nodes.map(node => <PostDetails post={node} key={node.id}/>)}
      </div>
      {hasPrev && <button onClick={goPrev}>PREV</button>}
      {hasNext && <button onClick={goNext}>NEXT</button>}
    </div>
  )
}

export default createRefetchContainer(
  postFeed, 
  {
    posts: graphql`
      fragment PostFeed_posts on Query 
        @argumentDefinitions(
          first: { type: "Int" },
          after: { type: "String" },
          last:  { type: "Int" },
          before: { type: "String" },
          orderBy: { type: "PostOrdering" }
        ){
        postFeed(
          first: $first, 
          after: $after,
          last: $last,
          before: $before,
          orderBy: $orderBy
        ) {
          edges {
            node {
              id
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
      $before: String,
      $orderBy: PostOrdering) {

      ...PostFeed_posts @arguments(first: $first,
                                   after: $after,
                                   last: $last,
                                   before: $before,
                                   orderBy: $orderBy)
    }  
  `
)