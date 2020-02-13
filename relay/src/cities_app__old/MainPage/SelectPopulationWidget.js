import React, { useCallback } from "react";
import { commitLocalUpdate } from "relay-runtime";
import { createFragmentContainer, graphql } from "react-relay";

function SelectPopulationWidget({ value, meta, relay }) {
  console.log("SelectPopulationWidget", value, meta);

  const onPopulationUpdate = useCallback(([lower, upper]) => {
    commitLocalUpdate(relay.environment, store => {
      const citySearchParams = store.get("client:UICitySearchParams");
      citySearchParams.setValue(lower, "populationLowerBound");
      citySearchParams.setValue(upper, "populationUpperBound");
    });
  });

  return null
  
  // (
  //   <div>
  //     <div>{JSON.stringify(value)}</div>
  //     <div>{JSON.stringify(meta)}</div>
  //   </div>
  // );
}

export default createFragmentContainer(SelectPopulationWidget, {
  value: graphql`
    fragment SelectPopulationWidget_value on UICitySearchParams {
      populationUpper
      populationLower
    }
  `,
  meta: graphql`
    fragment SelectPopulationWidget_meta on CitiesMetadata {
      populationLowerBound
      populationUpperBound
    }
  `
});
