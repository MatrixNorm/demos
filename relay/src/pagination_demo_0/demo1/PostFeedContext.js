// @flow
/* globals $PropertyType React$Context */

import { createContext } from "react";
import type { PostFeed_search } from "./__generated__/PostFeed_search.graphql";

export type LocalStateType = {
  fieldsConfig: any,
  activeField: string,
  isLoading: boolean
};

export type ActionType =
  | { type: "PREV_PAGE" }
  | { type: "NEXT_PAGE" }
  | { type: "ACTIVE_FIELD_CHANGE", payload: { field: string } }
  | { type: "ORDER_DIRECTION_CHANGE" }
  | { type: "LOADING_STARTED" }
  | { type: "LOADING_FINISHED" };

export type PostConnection = $PropertyType<PostFeed_search, "posts">;

export type ContextValueType = {
  state: LocalStateType,
  dispatch: (ActionType) => void,
  posts: PostConnection
};

export const initialLocalState: LocalStateType = {
  fieldsConfig: {
    createdAt: { desc: false },
    viewsCount: { desc: true }
  },
  activeField: "createdAt",
  isLoading: false
};

const defaultContextValue: ContextValueType = {
  state: initialLocalState,
  dispatch: function () {},
  posts: null
};

export const PostFeedContext: React$Context<ContextValueType> = createContext(
  defaultContextValue
);
