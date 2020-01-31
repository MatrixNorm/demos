import * as React from "react";
import { useState } from "react";
import { graphql, createFragmentContainer } from "react-relay";
import {
  createOperationDescriptor,
  getRequest,
  IEnvironment
} from "relay-runtime";
import styled from "styled-components";
import { TextInput, NumberInput } from "../elements/Inputs";
import { SearchParameters_metadata } from "__relay__/SearchParameters_metadata.graphql";

interface Props {
  metadata: SearchParameters_metadata;
  initialSearchParams: SearchParams;
  environment: IEnvironment;
  refetch: any;
}

interface SearchParams {
  countryNameContains: string | null;
  populationGte: number | null;
  populationLte: number | null;
}

// const Input = styled.input`
//   width: calc(100% - 4px);
//   padding: 0;
// `;

const Section = styled.section`
  margin-bottom: 20px;
`;

export function SearchParametersPure({ val, on }) {
  return (
    <div>
      <Section>
        <div>Country:</div>
        <TextInput
          value={val.countryNameContains || ""}
          onChange={e => on.countryNameContains(e.target.value)}
        />
      </Section>
      <Section>
        <div>Population more than:</div>
        <NumberInput
          step="100000"
          value={val.populationGte || ""}
          onChange={e => on.populationGte(parseInt(e.target.value) || null)}
        />
      </Section>
      <Section>
        <div>Population less than:</div>
        <NumberInput
          step="100000"
          value={val.populationLte || ""}
          onChange={e => on.populationLte(parseInt(e.target.value) || null)}
        />
      </Section>
    </div>
  );
}

const defaultInput: SearchParams = {
  countryNameContains: "",
  populationGte: 0,
  populationLte: 100000000
};

function SearchParameters({
  metadata,
  initialSearchParams,
  environment,
  refetch
}: Props) {
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
    environment.retain(operationDescriptor);
    //console.log(searchParams);
    refetch({ searchParams });
  }

  return (
    <div>
      <SearchParametersPure
        val={{
          countryNameContains: searchParams.countryNameContains,
          populationGte: searchParams.populationGte,
          populationLte: searchParams.populationLte
        }}
        on={{
          countryNameContains: val =>
            setSearchParams({
              ...searchParams,
              countryNameContains: val
            }),
          populationGte: val =>
            setSearchParams({
              ...searchParams,
              populationGte: val
            }),
          populationLte: val =>
            setSearchParams({
              ...searchParams,
              populationGte: val
            })
        }}
      />
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
