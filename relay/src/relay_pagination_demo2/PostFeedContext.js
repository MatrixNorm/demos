// @flow
/* globals $PropertyType $NonMaybeType */

import { createContext } from 'react'
import type { PostFeed_search } from "./__generated__/PostFeed_search.graphql";

type PostConnection = $NonMaybeType<$PropertyType<PostFeed_search, "posts">>;

export type PostFeedContextValueType = {|
  refetch: any,
  posts: ?PostConnection,
  isLoading: boolean
|};

export const PostFeedContext: React$Context<PostFeedContextValueType> = createContext()
