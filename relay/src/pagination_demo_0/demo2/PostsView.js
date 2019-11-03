import { createFragmentContainer, graphql } from "react-relay";

function PostView({ orderingSettings }) {
  const { activeField, allOrderings } = orderingSettings;
  
}

export default createFragmentContainer(PostView, {
  orderingSettings: graphql`
    fragment CitiesView_orderingSettings on PostListingState {
      activeField
      allOrderings
    }
  `
});
