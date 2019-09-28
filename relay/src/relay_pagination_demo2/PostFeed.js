// @flow

import { createRefetchContainer, graphql, type RelayProp } from "react-relay";
import React, { useState, type ElementType } from "react";
import {
  PostFeedContext,
  type PostFeedContextValueType,
  type PostConnection
} from "./PostFeedContext";

type PostFeedProps = {|
  relay: RelayProp,
  search: { +posts: ?PostConnection },
  children: ElementType[]
|};

const PostFeed = ({ relay, search, children }: PostFeedProps) => {
  const [isLoading, setIsLoading] = useState(false);

  function customRefetch(refetchVariables) {
    if (!isLoading) {
      setIsLoading(true);
      relay.refetch(refetchVariables, null, () => setIsLoading(false));
    }
  }
  if (search.posts) {
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
  }
  return <h1>fuck you</h1>;
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
