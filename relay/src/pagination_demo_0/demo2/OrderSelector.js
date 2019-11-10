import React from "react";
import { createFragmentContainer, graphql } from "react-relay";
import * as ChangePostListingActiveFieldMutation from "./ChangePostListingActiveFieldMutation";

function OrderSelector({ relay, state }) {
  const { activeField, configuration } = state;

  function handleChange(activeField) {
    ChangePostListingActiveFieldMutation.commit(relay.environment, {
      postListingId: state.id,
      activeField
    });
  }

  return (
    <select value={activeField} onChange={e => handleChange(e.target.value)}>
      {configuration.map(ordering => {
        return (
          <option value={ordering.order.field} key={ordering.order.field}>
            {ordering.fieldDescription_ASC}
          </option>
        );
      })}
    </select>
  );
}

export default createFragmentContainer(OrderSelector, {
  state: graphql`
    fragment OrderSelector_state on PostListing {
      id
      activeField
      configuration {
        order {
          field
          desc
        }
        fieldDescription_ASC
        fieldDescription_DESC
      }
    }
  `
});
