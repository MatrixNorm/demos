// @flow
/* globals $PropertyType React$Context */

import { createContext } from "react";
import type { PostFeed_search } from "./__generated__/PostFeed_search.graphql";
import type { PostFeedRefetchQueryVariables } from "./__generated__/PostFeedRefetchQuery.graphql";

export type PostConnection = $PropertyType<PostFeed_search, "posts">;

export type RefetchFunction = (PostFeedRefetchQueryVariables) => void

export type ContextValueType = {|
  +refetch: RefetchFunction,
  +posts: PostConnection
|};

const defaultContextValue = {
  posts: null,
  refetch: function() {}
};

export const PostFeedContext: React$Context<ContextValueType> = createContext(
  defaultContextValue
);
