// @flow
/* globals $PropertyType React$Context */

import { createContext } from "react";
import type { RelayRefetchProp } from "react-relay";
import type { PostFeed_search } from "./__generated__/PostFeed_search.graphql";

export type PostConnection = $PropertyType<PostFeed_search, "posts">;

export type ContextValueType = {|
  +refetch: $PropertyType<RelayRefetchProp, "refetch">,
  +posts: PostConnection
|};

const defaultContextValue = {
  posts: null,
  refetch: function() {
    return {
      dispose() {}
    }
  },
};

export const PostFeedContext: React$Context<ContextValueType> = createContext(
  defaultContextValue
);
