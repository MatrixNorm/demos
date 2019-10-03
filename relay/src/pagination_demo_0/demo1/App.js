// @flow

import { QueryRenderer, graphql } from "react-relay";
import React from "react";

import environment from "./Environment";
import PostFeed from "./PostFeed";
import PostPagination from "./PostPagination";
import PostPaginationControls from "./PostPaginationControls";

import type { AppQueryResponse } from "./__generated__/AppQuery.graphql";

const AppQuery = graphql`
  query AppQuery(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $orderBy: PostOrderingInput
  ) {
    x1: search {
      ...PostFeed_search
        @arguments(
          first: $first
          after: $after
          last: $last
          before: $before
          orderBy: $orderBy
        )
    }
    x2: search {
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
`;

type Props = {
  +error: ?Error,
  +props: ?AppQueryResponse
};

const render = ({ error, props }: Props) => {
  if (error) {
    return <div style={{ color: "red" }}>Error: {error.message}</div>;
  }
  if (props) {
    return (
      <>
        {props.x1 && (
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
  }
  return <div>Loading...</div>;
};

const App = () => {
  return (
    <QueryRenderer
      query={AppQuery}
      environment={environment}
      variables={{
        first: 3,
        after: null,
        orderBy: { field: "createdAt", desc: true }
      }}
      render={render}
    />
  );
};

export default App;
