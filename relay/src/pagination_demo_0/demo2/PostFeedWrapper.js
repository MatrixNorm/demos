// @flow

import {
  createRefetchContainer,
  graphql,
  type RelayRefetchProp
} from "react-relay";
import React from "react";
import { PostFeedContext } from "./PostFeedContext";
import type { PostFeed_search } from "./__generated__/PostFeed_search.graphql";

type Props = {|
  relay: RelayRefetchProp,
  search: PostFeed_search,
  children: any
|};

const PostFeedWrapper = ({ relay, search: { posts }, children }: Props) => {
  return (
    <div className="post-feed">
      <PostFeedContext.Provider value={{ state, dispatch, posts }}>
        {children}
      </PostFeedContext.Provider>
    </div>
  );
};

export default createRefetchContainer(
  PostFeedWrapper,
  {
    settings: graphql`
      fragment PostFeedWrapper_settings on PostListingState
        @argumentDefinitions(id: { type: "ID!" }) {
        
      }
    `,
    sorting: graphql`
      fragment PostFeed_sorting on LocalState
        @argumentDefinitions(postListingId: { type: "ID" }) {
        postListingState(id: $postListingId) {
          id
          isLoading
          activeField
          fieldConfig
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
