// @flow

import {
  createRefetchContainer,
  graphql,
  type RelayRefetchProp
} from "react-relay";
import React, { useReducer } from "react";
import {
  PostFeedContext,
  initialLocalState,
  type ActionType,
  type LocalStateType
} from "./PostFeedContext";
import type { PostFeed_search } from "./__generated__/PostFeed_search.graphql";
import type { PostOrderingFields } from "./__generated__/AppQuery.graphql";

type Props = {|
  relay: RelayRefetchProp,
  search: PostFeed_search,
  children: any
|};

function reducer(state: LocalStateType, action: ActionType): LocalStateType {
  switch (action.type) {
    case "ACTIVE_FIELD_CHANGE": {
      let activeField = action.payload.field;
      return { ...state, activeField };
    }
    case "ORDER_DIRECTION_CHANGE": {
      let prev = state.fieldsConfig[state.activeField];
      let next = { ...prev, desc: !prev.desc };
      let fieldsState = { ...state.fieldsConfig, [state.activeField]: next };
      return { ...state, fieldsState };
    }
    case "LOADING_STARTED":
      return { ...state, isLoading: true };
    case "LOADING_FINISHED":
      return { ...state, isLoading: false };
    case "PREV_PAGE":
    case "NEXT_PAGE":
      return state;
    default:
      (action: empty);
      return state;
  }
}

const PostFeed = ({ relay, search: { posts }, children }: Props) => {
  const [state, dispatch] = useReducer<LocalStateType, ActionType>(
    reducer,
    initialLocalState
  );

  function __dispatch(action: ActionType) {
    dispatch(action);
    switch (action.type) {
      case "PREV_PAGE":
        posts &&
          __refetch({
            last: 3,
            after: posts.pageInfo.startCursor
          });
        break;
      case "NEXT_PAGE":
        posts &&
          __refetch({
            first: 3,
            after: posts.pageInfo.endCursor
          });
        break;
      case "ACTIVE_FIELD_CHANGE": {
        let field: PostOrderingFields = action.payload.field;
        let desc: boolean = state.fieldsConfig[field].desc;
        __refetch({
          first: 3,
          orderBy: { field, desc }
        });
        break;
      }
      case "ORDER_DIRECTION_CHANGE": {
        let field: PostOrderingFields = state.activeField;
        let desc: boolean = state.fieldsConfig[field].desc;
        __refetch({
          first: 3,
          orderBy: { field, desc }
        });
        break;
      }
    }
  }

  function __refetch(kwargs) {
    const defaults = {
      first: null,
      after: null,
      last: null,
      before: null,
      orderBy: null
    };
    dispatch({ type: "LOADING_STARTED" });
    relay.refetch({ ...defaults, ...kwargs }, () =>
      dispatch({ type: "LOADING_FINISHED" })
    );
  }

  return (
    <div className="post-feed">
      <PostFeedContext.Provider value={{ state, dispatch: __dispatch, posts }}>
        {children}
      </PostFeedContext.Provider>
    </div>
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
