// @flow

import { createRefetchContainer, graphql } from "react-relay";
import React from "react";
import PostDetails from "./PostDetails";

const PostPagination = ({ relay, viewer }) => {
  const { postConnection } = viewer;

  const nodes = postConnection
    ? postConnection.edges
        .filter(Boolean)
        .map(edge => edge.node)
        .filter(Boolean)
    : [];

  const hasPrev = postConnection?.pageInfo.hasPreviousPage;
  const hasNext = postConnection?.pageInfo.hasNextPage;

  function prevPagePlease() {
    hasPrev &&
      relay.refetch(prevVars => {
        return { ...prevVars, pageNo: pageNo - 1 };
      });
  }

  function nextPagePlease() {
    hasNext &&
      relay.refetch(prevVars => {
        return { ...prevVars, pageNo: pageNo + 1 };
      });
  }

  return (
    <div>
      <div>
        {nodes.map(node => (
          <PostDetails post={node} key={node.id} />
        ))}
      </div>
      {hasPrev && (
        <button
          onClick={() => {
            dispatch({ type: "PREV_PAGE" });
          }}
        >
          PREV
        </button>
      )}
      {hasNext && (
        <button
          onClick={() => {
            dispatch({ type: "NEXT_PAGE" });
          }}
        >
          NEXT
        </button>
      )}
    </div>
  );
};

export default createRefetchContainer(
  PostPagination,
  {
    viewer: graphql`
      fragment PostPagination_viewer on Viewer
        @argumentDefinitions(
          first: { type: "Int" }
          after: { type: "String" }
          last: { type: "Int" }
          before: { type: "String" }
          orderBy: { type: "PostOrderingInput" }
        ) {
        postConnection(
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
    query PostPaginationRefetchQuery(
      $first: Int
      $after: String
      $last: Int
      $before: String
      $orderBy: PostOrderingInput
    ) {
      viewer {
        ...PostPagination_viewer
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
