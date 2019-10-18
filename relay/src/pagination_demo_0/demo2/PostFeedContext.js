// @flow
/* globals $PropertyType React$Context */

import { createContext } from "react";
import type { PostFeed_search } from "./__generated__/PostFeed_search.graphql";
import { initialLocalState } from "./PostFeedHooks";
import type { ActionType, LocalStateType } from "./PostFeedHooks";

export type PostConnection = $PropertyType<PostFeed_search, "posts">;

export type ContextValueType = {
  state: LocalStateType,
  dispatch: ActionType => void,
  posts: PostConnection
};


const defaultContextValue: ContextValueType = {
  state: initialLocalState,
  dispatch: function() {},
  posts: null
};

export const PostFeedContext: React$Context<ContextValueType> = createContext(
  defaultContextValue
);
