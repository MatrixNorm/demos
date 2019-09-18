// @flow

import {
  createRefetchContainer, 
  graphql,
  type RelayProp
} from 'react-relay'

import React from 'react'
import PostPagination from './PostPagination'
import PostPaginationControls from './PostPaginationControls'

import type { PostFeed_search as PostFeedType } from './__generated__/PostFeed_search.graphql'

type PostFeedProps = {| 
  relay: RelayProp,
  search: PostFeedType,
|}

const PostFeed = ({relay, search}: PostFeedProps) => {
  return (
    <div>
      <PostPaginationControls relay={relay} />
      <PostPagination relay={relay} items={search.posts} />
    </div>
  )
}

export default createRefetchContainer(
  PostFeed, 
  {
    search: graphql`
      fragment PostFeed_search on PostSearch 
        @argumentDefinitions(
          first: { type: "Int" },
          after: { type: "String" },
          last:  { type: "Int" },
          before: { type: "String" },
          orderBy: { type: "PostOrdering" }
        ) {
        posts(
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
        search {
          ...PostFeed_search @arguments(
            first: $first,
            after: $after,
            last: $last,
            before: $before,
            orderBy: $orderBy)
      }      
    }  
  `
)