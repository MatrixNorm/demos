import React from "react";
import { createFragmentContainer, graphql } from "react-relay";
//$FlowFixMe
import { commitLocalUpdate, ROOT_ID } from "relay-runtime";


function OrderSelector({ relay, state }) {
  const { activeField, configuration } = state;

  function handleChange(newActiveField) {
    // commitLocalUpdate(environment, store => {
    //   const record = store
    //     .get(ROOT_ID)
    //     .getLinkedRecord("localState")
    //     .getLinkedRecord("postListingState", { id: "0" });
    //   record.setValue(newActiveField, "activeField");
    // });
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
