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
    active: "createdAt"
  };

  function reducer(state, action) {
    switch (action.type) {
      case "PREV_PAGE":
        return state;
      case "NEXTTTTT_PAGE":
        return state;
      case "ORDER_CHANGE":
        return {
          active: action.payload.field,
          configuration: {
            ...state.configuration,
            [action.payload.field]: action.payload.desc
          }
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="post-feed">
      <PostFeedContext.Provider
        value={{ state, dispatch, posts: search.posts }}
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
