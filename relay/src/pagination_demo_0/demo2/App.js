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
    search1: search {
      ...PostFeed_search
        @arguments(
          first: $first
          after: $after
          last: $last
          before: $before
          orderBy: $orderBy
        )
    }
    sorting1: sorting {
      ...PostFeed_sorting @arguments(postListingId: $postListingId_1)
    }
    search2: search {
      ...PostFeed_search
        @arguments(
          first: $first
          after: $after
          last: $last
          before: $before
          orderBy: $orderBy
        )
    }
    sorting2: sorting {
      ...PostFeed_sorting @arguments(postListingId: $postListingId_2)
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
        {props.search1 && (
          <PostFeed search={props.search1}>
            <PostPaginationControls />
            <PostPagination />
          </PostFeed>
        )}
        {props.search2 && (
          <PostFeed search={props.search2}>
            <PostPagination />
            <br />
            <PostPaginationControls />
          </PostFeed>
        )}
      </>
    );
  }
  return <div>Loading...</div>;
};

const App = () => {
  const initialVariables = {
    first: 3,
    after: null,
    orderBy: { field: "createdAt", desc: true },
    postListingId_1: "client:post-listing-1",
    postListingId_2: "client:post-listing-2"
  };
  return (
    <QueryRenderer
      query={AppQuery}
      environment={environment}
      variables={{ ...initialVariables }}
      render={render}
    />
  );
};

export default App;
