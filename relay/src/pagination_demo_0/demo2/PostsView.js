// @flow

import React from "react";
//$FlowFixMe
import { LocalQueryRenderer, graphql } from "react-relay";
import OrderSelector from "./OrderSelector";
import environment from "./Environment";

function PostsView({ listingId }: any) {
  return (
    <LocalQueryRenderer
      query={graphql`
        query PostsViewQuery($listingId: ID!) {
          __typename
          localState {
            postListingState(id: $listingId) {
              ...OrderSelector_state
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
            <OrderSelector state={props.localState.postListingState} />
          </div>
        );
      }}
    />
  );
}

//             <PostsListing localSettings={props.localSettings} />

export default PostsView;

// export default createFragmentContainer(PostsView, {
//   orderingSettings: graphql`
//     fragment CitiesView_orderingSettings on PostListingState {
//       activeField
//       allOrderings
//     }
//   `
// });
