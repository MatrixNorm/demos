// @flow

import {
  createRefetchContainer,
  graphql,
  type RelayRefetchProp
} from "react-relay";
import React from "react";
import { PostFeedContext } from "./PostFeedContext";
import { usePostFeedReducer, type ActionType } from "./PostFeedHooks";
import type { PostFeed_search } from "./__generated__/PostFeed_search.graphql";
import type { PostOrderingFields } from "./__generated__/AppQuery.graphql";

type Props = {|
  relay: RelayRefetchProp,
  search: PostFeed_search,
  children: any
|};

const PostFeed = ({ relay, search: { posts }, children }: Props) => {
  const [state, dispatch] = usePostFeedReducer();

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
