// @flow
import React from "react";
//$FlowFixMe
import { QueryRenderer, graphql } from "react-relay";
import OrderSelector from "./OrderSelector";
import PostPaginationContainer from "./PostPaginationContainer";
import environment from "./env";

function PostsView({ listingId }: any) {
  return (
    <QueryRenderer
      query={graphql`
        query PostsViewQuery($listingId: ID!) {
          localState @local {
            postListing(id: $listingId) {
              ...OrderSelector_state
              ...PostPaginationContainer_order
            }
          }
        }
      `}
      environment={environment}
      variables={{ listingId }}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <h3>loading...</h3>;
        return (
          <div>
            <OrderSelector state={props.localState.postListing} />
            <PostPaginationContainer order={props.localState.postListing} />
          </div>
        );
      }}
    />
  );
}

// <PostsListing localSettings={props.localSettings} />

export default PostsView;

// export default createFragmentContainer(PostsView, {
//   orderingSettings: graphql`
//     fragment CitiesView_orderingSettings on PostListingState {
//       activeField
//       allOrderings
//     }
//   `
// });
