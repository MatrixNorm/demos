// @flow

import { createRefetchContainer, graphql, type RelayProp } from "react-relay";
import React, { useState } from "react";
import {
  PostFeedContext,
  type PostFeedContextValueType
} from "./PostFeedContext";
import type { PostFeed_search } from "./__generated__/PostFeed_search.graphql";

type PostFeedProps = {|
  relay: RelayProp,
  search: PostFeed_search,
  children: any
|};

const PostFeed = ({ relay, search, children }: PostFeedProps) => {
  const [isLoading, setIsLoading] = useState(false);
  //console.log(55555555555)
  function customRefetch(refetchVariables) {
    if (!isLoading) {
      setIsLoading(true);
      relay.refetch(refetchVariables, null, () => setIsLoading(false));
    }
  }
  const contextValue: PostFeedContextValueType = {
    refetch: customRefetch,
    posts: search.posts,
    isLoading
  };
  return (
    <PostFeedContext.Provider value={contextValue}>
      {children}
    </PostFeedContext.Provider>
  );
};

export default createRefetchContainer(
  PostFeed,
  {
    search: graphql`
      fragment PostFeed_search on PostSearch
        @argumentDefinitions(
          first: { type: "Int" }
          after: { type: "String" }
          last: { type: "Int" }
          before: { type: "String" }
          orderBy: { type: "PostOrderingInput" }
        ) {
        posts(
          first: $first
          after: $after
          last: $last
          before: $before
          orderBy: $orderBy
        ) {
          edges {
            node {
              id
              ...PostDetails_post
            }
            cursor
          }
          pageInfo {
            hasNextPage
            endCursor
            hasPreviousPage
            startCursor
          }
          orderBy {
            field
            desc
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
      $before: String
      $orderBy: PostOrderingInput
    ) {
      search {
        ...PostFeed_search
          @arguments(
            first: $first
            after: $after
            last: $last
            before: $before
            orderBy: $orderBy
          )
      }
    }
  `
);
