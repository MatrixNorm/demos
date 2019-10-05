// @flow
/* globals $PropertyType React$Context */

import { createContext } from "react";
import type { PostFeed_search } from "./__generated__/PostFeed_search.graphql";

export type PostConnection = $PropertyType<PostFeed_search, "posts">;

export type ContextValueType = {
  state: any,
  dispatch: any,
  posts: PostConnection
};

const defaultContextValue = {
  state: null,
  dispatch: null,
  posts: null
};

export const PostFeedContext: React$Context<ContextValueType> = createContext(
  defaultContextValue
);
