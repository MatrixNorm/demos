// @flow

import React from "react";
import { createFragmentContainer, QueryRenderer, graphql } from "react-relay";
import PostPagination from './PostPagination'

function PostPaginationContainer({ relay, order }) {
  const { activeField, configuration } = order;
  const activeOrdering = configuration.find(
    ordering => ordering.order.field === activeField
  ).order;
  console.log(111111111111111111, activeOrdering);
  return (
    <QueryRenderer
      query={graphql`
        query PostPaginationContainerQuery(
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
      `}
      environment={relay.environment}
      variables={{ first: 3, after: null, orderBy: activeOrdering }}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <h3>loading...</h3>;
        return <PostPagination viewer={props.viewer} />;
      }}
    />
  );
}

export default createFragmentContainer(PostPaginationContainer, {
  order: graphql`
    fragment PostPaginationContainer_order on PostListing {
      activeField
      configuration {
        order {
          field
          desc
        }
      }
    }
  `
});
