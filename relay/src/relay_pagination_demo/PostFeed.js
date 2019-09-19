// @flow

import {
  createRefetchContainer, 
  graphql,
  type RelayProp
} from 'react-relay'

import React from 'react'
import { PostFeedContext } from './PostFeedContext'
import type { PostFeed_search as PostFeedType } from './__generated__/PostFeed_search.graphql'

type PostFeedProps = {| 
  relay: RelayProp,
  search: PostFeedType,
  children: any
|}

const PostFeed = ({relay, search, children}: PostFeedProps) => {
  return (
    <PostFeedContext.Provider value={{refetch: relay.refetch, posts: search.posts}}>
      {children}
    </PostFeedContext.Provider>
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