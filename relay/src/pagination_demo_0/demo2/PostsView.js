// @flow

import React from "react";
//$FlowFixMe
import { LocalQueryRenderer, graphql } from "react-relay";
import environment from "./env";

function PostsView({ listingId }) {
  return (
    <LocalQueryRenderer
      query={graphql`
        query PostsViewQuery($listingId: ID!) {
          __typename
          localState {
            postListingState(id: $listingId) {
              ...OrderSelector_XXX
              ...PostsListing_XXX
            }
          }
        }
      `}
      environment={environment}
      variables={{}}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <h3>loading...</h3>;
        return (
          <div>
            <OrderSelector localSettings={props.localSettings} />
            <PostsListing localSettings={props.localSettings} />
          </div>
        );
      }}
    />
  );
}

// export default createFragmentContainer(PostsView, {
//   orderingSettings: graphql`
//     fragment CitiesView_orderingSettings on PostListingState {
//       activeField
//       allOrderings
//     }
//   `
// });
