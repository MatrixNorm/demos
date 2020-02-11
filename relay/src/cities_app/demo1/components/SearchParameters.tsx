import { useState } from "react";
import { graphql, createFragmentContainer } from "react-relay";
import {
  createOperationDescriptor,
  getRequest,
  IEnvironment
} from "relay-runtime";
import { SearchParameters_metadata } from "__relay__/SearchParameters_metadata.graphql";
import * as t from "../types.codegen";

type Props = {
  metadata: SearchParameters_metadata;
  initialSearchParams: t.UiCitySearchParams;
  environment: IEnvironment;
  refetch: any;
  render: any;
};

export type EventT = ["fieldChange", [string, any]] | ["applyChange"];
export type DispatchT = (event: EventT) => void;

const defaultInput: t.UiCitySearchParams = {
  countryNameContains: "",
  populationGte: 0,
  populationLte: 999999999
};

function commitSearchParamsInRelaystore(
  searchParams: t.UiCitySearchParams,
  relayEnv: IEnvironment
) {
  const query = graphql`
    query SearchParametersQuery {
      __typename
      uiState {
        id
        citySearchParams {
          countryNameContains
          populationGte
          populationLte
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
  relayEnv.commitPayload(operationDescriptor, data);
  relayEnv.retain(operationDescriptor);
}

export function SearchParameters({
  metadata,
  initialSearchParams,
  environment,
  render
}: Props) {
  const [searchParams, setSearchParams] = useState({
    ...defaultInput,
    ...{
      populationGte: metadata.populationLowerBound,
      populationLte: metadata.populationUpperBound
    },
    ...(initialSearchParams || {})
  });

  let dispatch = (event: EventT) => {
    if (event[0] === "fieldChange") {
      let [fieldName, fieldValue] = event[1];
      setSearchParams({
        ...searchParams,
        [fieldName]: fieldValue
      });
      return;
    }
    if (event[0] === "applyChange") {
      commitSearchParamsInRelaystore(searchParams, environment);
      return;
    }
  };
  return render({ dispatch, searchParams });
}
