// @flow

import {
  createRefetchContainer,
  graphql,
  type RelayRefetchProp
} from "react-relay";
import React, { useEffect } from "react";
import { PostFeedContext } from "./PostFeedContext";
import { usePostFeedReducer, type ActionType } from "./PostFeedHooks";
import type { PostFeed_search } from "./__generated__/PostFeed_search.graphql";
import type { PostOrderingInput } from "./__generated__/AppQuery.graphql";

type Props = {|
  relay: RelayRefetchProp,
  search: PostFeed_search,
  children: any
|};

type ConnectionInputArguments =
  | {| first: number, orderBy: PostOrderingInput |}
  | {| first: number, after: string |}
  | {| last: number, before: string |};

const PostFeed = ({ relay, search: { posts }, children }: Props) => {
  const [[state, command], dispatch] = usePostFeedReducer();

  useEffect(function() {
    if (command) {
      console.log(command);
      switch (command.type) {
        case "next":
          __refetch({ first: command.first, after: posts.pageInfo.endCursor });
          break;
        case "prev":
          __refetch({ last: command.last, before: posts.pageInfo.startCursor });
          break;
        case "init":
          __refetch({ first: command.first, orderBy: command.orderBy });
          break;
      }
    }
  });

  function __refetch(kwargs: ConnectionInputArguments) {
    const defaults = {
      first: null,
      after: null,
      last: null,
      before: null,
      orderBy: null
    };
    dispatch({ type: "LOADING_STARTED" });
    relay.refetch({ ...defaults, ...kwargs }, null, () =>
      dispatch({ type: "LOADING_FINISHED" })
    );
  }

  return (
    <div className="post-feed">
      <PostFeedContext.Provider value={{ state, dispatch, posts }}>
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
