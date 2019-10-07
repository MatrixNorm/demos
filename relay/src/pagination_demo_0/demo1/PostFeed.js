// @flow

import {
  createRefetchContainer,
  graphql,
  type RelayRefetchProp
} from "react-relay";
import React from "react";
import { PostFeedContext } from "./PostFeedContext";
import { usePostFeedReducer, type ActionType, type PostOrdering } from "./PostFeedHooks";
import type { PostFeed_search } from "./__generated__/PostFeed_search.graphql";

type Props = {|
  relay: RelayRefetchProp,
  search: PostFeed_search,
  children: any
|};

type ConnectionInputArguments =
  | {| first: number, orderBy: PostOrdering |}
  | {| first: number, after: string |}
  | {| last: number, before: string |};

const PostFeed = ({ relay, search: { posts }, children }: Props) => {
  const [state, dispatch] = usePostFeedReducer();

  function __refetch(kwargs: ConnectionInputArguments) {
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

  function __dispatch(action: ActionType) {
    dispatch(action);
    switch (action.type) {
      case "PREV_PAGE":
        posts && posts.pageInfo.startCursor &&
          __refetch({
            last: 3,
            before: posts.pageInfo.startCursor
          });
        break;
      case "NEXT_PAGE":
        posts && posts.pageInfo.endCursor &&
          __refetch({ 
            first: 3,
            after: posts.pageInfo.endCursor
          });
        break;
      case "ACTIVE_FIELD_CHANGE": {
        let field = action.payload.field;
        let desc = state.fieldsConfig[field].desc;
        __refetch({
          first: 3,
          orderBy: { field, desc }
        });
        break;
      }
      case "ORDER_DIRECTION_CHANGE": {
        let field = state.activeField;
        let desc = state.fieldsConfig[field].desc;
        __refetch({
          first: 3,
          orderBy: { field, desc }
        });
        break;
      }
    }
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
