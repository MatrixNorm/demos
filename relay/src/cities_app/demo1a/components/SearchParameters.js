import React, { useState } from "react";
import { graphql } from "react-relay";
import { createOperationDescriptor, getRequest } from "relay-runtime";

const defaultInput = {
  countryNameContains: "",
  populationGte: 0,
  populationLte: 100000000
};

export default function SearchParameters({
  metadata,
  initialSearchParams,
  relay
}) {
  console.log("SearchParameters");
  const [searchParams, setSearchParams] = useState({
    ...defaultInput,
    ...(initialSearchParams || {})
  });

  function onButtonClick() {
    const query = graphql`
      query SearchParametersQuery {
        __typename
        uiState {
          id
          citySearchParams {
            countryNameContains
            populationGte
          }
        }
      }
    `;
    const request = getRequest(query);
    const operationDescriptor = createOperationDescriptor(request, {});
    let data = {
      __typename: "__Root",
      uiState: {
        id: "client:UIState",
        citySearchParams: { ...searchParams }
      }
    };
    relay.environment.commitPayload(operationDescriptor, data);
    relay.environment.retain(operationDescriptor.root);
    console.log(searchParams);
    relay.refetch({ searchParams });
  }

  return (
    <div>
      <div>Country:</div>
      <input
        type="text"
        value={searchParams.countryNameContains}
        onChange={e =>
          setSearchParams({
            ...searchParams,
            countryNameContains: e.target.value
          })
        }
      />
      <div>Population greater than:</div>
      <input
        type="number"
        step="100000"
        value={searchParams.populationGte}
        onChange={e =>
          setSearchParams({
            ...searchParams,
            populationGte: parseInt(e.target.value)
          })
        }
      />
      <div>Population less than:</div>
      <input
        type="number"
        step="100000"
        value={searchParams.populationLte}
        onChange={e =>
          setSearchParams({
            ...searchParams,
            populationLte: parseInt(e.target.value)
          })
        }
      />
      <div>
        <button onClick={onButtonClick}>Apply</button>
      </div>
    </div>
  );
}