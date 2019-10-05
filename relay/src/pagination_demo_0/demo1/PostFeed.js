// @flow

import {
  createRefetchContainer,
  graphql,
  type RelayRefetchProp
} from "react-relay";
import React, { useReducer } from "react";
import { PostFeedContext } from "./PostFeedContext";
import type { PostFeed_search } from "./__generated__/PostFeed_search.graphql";

type Props = {|
  relay: RelayRefetchProp,
  search: PostFeed_search,
  children: any
|};

const PostFeed = ({ relay, search, children }: Props) => {
  const initialState = {
    configuration: {
      createdAt: { desc: false },
      viewsCount: { desc: true }
    },
    active: "createdAt",
    isLoading: false
  };

  function reducer(state, action) {
    switch (action.type) {
      case "ORDER_CHANGE":
        return {
          active: action.payload.field,
          configuration: {
            ...state.configuration,
            [action.payload.field]: action.payload.desc
          }
        };
      case "LOADING_STARTED":
        return {...state, isLoading: true};
      case "LOADING_FINISHED`":
        return {...state, isLoading: false};
      default:
        return state;
    }
  }

  function __dispatch(action) {
    dispatch(action);
    switch (action.type) {
      case "PREV_PAGE":
        __refetch({
          last: 3,
          after: search.posts.pageInfo.startCursor
        });
        break;
      case "NEXT_PAGE":
        __refetch({
          first: 3,
          after: search.posts.pageInfo.endCursor
        });
        break;
      case "ORDER_CHANGE":
        __refetch({ first: 3 });
        break;
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
    dispatch("LOADING_STARTED");
    relay.refetch({ ...defaults, ...kwargs }, () =>
      dispatch("LOADING_FINISHED")
    );
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="post-feed">
      <PostFeedContext.Provider
        value={{ state, dispatch: __dispatch, posts: search.posts }}
      >
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
