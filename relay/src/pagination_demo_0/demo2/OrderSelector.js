import React from "react";
import { createFragmentContainer, graphql } from "react-relay";
//$FlowFixMe
import { commitLocalUpdate, ROOT_ID } from "relay-runtime";
import environment from "./Environment";

function OrderSelector({ state }) {
  const { activeField, allOrderings } = state;

  function handleChange(newActiveField) {
    commitLocalUpdate(environment, store => {
      const record = store
        .get(ROOT_ID)
        .getLinkedRecord("localState")
        .getLinkedRecord("postListingState");
      record.setValue(newActiveField, "activeField");
    });
  }

  return (
    <select value={activeField} onChange={e => handleChange(e.target.value)}>
      {allOrderings.map(ordering => {
        return (
          <option value={ordering.field} key={ordering.field}>
            {ordering.fieldDescription_ASC}
          </option>
        );
      })}
    </select>
  );
}

export default createFragmentContainer(OrderSelector, {
  state: graphql`
    fragment OrderSelector_state on PostListingState {
      activeField
      allOrderings {
        field
        desc
        fieldDescription_ASC
        fieldDescription_DESC
      }
    }
  `
});
