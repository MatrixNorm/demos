// @flow

import { QueryRenderer, graphql } from "react-relay";
import React from "react";

import environment from "./Environment";
import PostFeed from "./PostFeed";
import PostPagination from "./PostPagination";
import PostPaginationControls from "./PostPaginationControls";

import type { PostOrderingInput } from "./__generated__/AppQuery.graphql";
import type { PostFeed_search } from "./__generated__/PostFeed_search.graphql";

const AppQuery = graphql`
  query AppQuery(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $orderBy1: PostOrderingInput
    $orderBy2: PostOrderingInput
  ) {
    x1: search {
      ...PostFeed_search
        @arguments(
          first: $first
          after: $after
          last: $last
          before: $before
          orderBy: $orderBy1
        )
    }
    x2: search {
      ...PostFeed_search
        @arguments(
          first: $first
          after: $after
          last: $last
          before: $before
          orderBy: $orderBy2
        )
    }
  }
`;

type RenderProps = {|
  +error: Error,
  +props: {|
    x1: ?PostFeed_search,
    x2: ?PostFeed_search
  |}
|};

const render = ({ error, props }: RenderProps) => {
  if (error) {
    return <div style={{ color: "red" }}>Error: {error.message}</div>;
  }
  if (!props) {
    return <h1>Loading...</h1>;
  }
  // XXX flow does not ask to checks if props.x1 is not null
  return (
    <>
      {props.x2 && (
        <PostFeed search={props.x1}>
          <PostPaginationControls.v1 />
          <PostPagination />
        </PostFeed>
      )}
      {props.x2 && (
        <PostFeed search={props.x2}>
          <PostPagination />
          <br />
          <PostPaginationControls.v2 />
        </PostFeed>
      )}
    </>
  );
};

const App = () => {
  const orderBy1: PostOrderingInput = { field: "createdAt", desc: true };
  const orderBy2: PostOrderingInput = { field: "viewsCount", desc: true };
  return (
    <QueryRenderer
      query={AppQuery}
      environment={environment}
      variables={{
        first: 3,
        after: null,
        orderBy1,
        orderBy2
      }}
      render={render}
    />
  );
};

export default App;
