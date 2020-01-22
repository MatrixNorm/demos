import React, { useState } from "react";
import { graphql, createFragmentContainer } from "react-relay";
import { createOperationDescriptor, getRequest } from "relay-runtime";
import styled from "styled-components";

const Input = styled.input`
  width: calc(100% - 4px);
  padding: 0;
`;

const Section = styled.section`
  margin-bottom: 20px;
`;

const defaultInput = {
  countryNameContains: "",
  populationGte: 0,
  populationLte: 100000000
};

function SearchParameters({
  metadata,
  initialSearchParams,
  environment,
  refetch
}) {
  //console.log("SearchParameters", metadata);
  const [searchParams, setSearchParams] = useState({
    ...defaultInput,
    ...{
      populationGte: metadata.populationLowerBound,
      populationLte: metadata.populationUpperBound
    },
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
    environment.commitPayload(operationDescriptor, data);
    environment.retain(operationDescriptor.root);
    //console.log(searchParams);
    refetch({ searchParams });
  }

  return (
    <div>
      <Section>
        <div>Country:</div>
        <Input
          type="text"
          value={searchParams.countryNameContains}
          onChange={e =>
            setSearchParams({
              ...searchParams,
              countryNameContains: e.target.value
            })
          }
        />
      </Section>
      <Section>
        <div>Population more than:</div>
        <Input
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
      </Section>
      <Section>
        <div>Population less than:</div>
        <Input
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
      </Section>
      <div>
        <button onClick={onButtonClick}>Apply</button>
      </div>
    </div>
  );
}

export default createFragmentContainer(SearchParameters, {
  metadata: graphql`
    fragment SearchParameters_metadata on CitiesMetadata {
      populationLowerBound
      populationUpperBound
    }
  `
});
