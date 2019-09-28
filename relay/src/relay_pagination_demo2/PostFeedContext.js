// @flow
/* globals $PropertyType $NonMaybeType React$Context */

import { createContext } from "react";
import type { PostFeed_search } from "./__generated__/PostFeed_search.graphql";

export type PostConnection = $NonMaybeType<$PropertyType<PostFeed_search, "posts">>;

export type PostFeedContextValueType = {|
  refetch: any,
  posts: PostConnection,
  isLoading: boolean
|};

export const PostFeedContext: React$Context<PostFeedContextValueType> = createContext();
