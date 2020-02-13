import * as React from "react";
import { useEffect, useState } from "react";
import { graphql } from "react-relay";
import {
  createOperationDescriptor,
  getRequest,
  IEnvironment
} from "relay-runtime";
import CitiesBrowser from "./components/CitiesBrowser";
import { UIStateType, SearchParamsType } from "./types";

interface AppProps {
  environment: IEnvironment;
}

interface State {
  ready: boolean;
  searchParams: SearchParamsType;
}

export default function App({ environment }: AppProps) {
  const [state, setState] = useState<State>({
    ready: false,
    searchParams: null
  });
  useEffect(() => {
    const query = graphql`
      query AppQuery {
        __typename
        uiState {
          citySearchParams {
            countryNameContains
            populationGte
            populationLte
          }
        }
      }
    `;
    const request = getRequest(query);
    const operation = createOperationDescriptor(request, {});
    const res = environment.lookup(operation.fragment);
    const uiState: UIStateType = res.data.uiState;
    setState({ ready: true, searchParams: uiState.citySearchParams });
  }, []);

  if (state.ready) {
    return (
      <CitiesBrowser
        searchParams={state.searchParams}
        environment={environment}
      />
    );
  } else {
    return null;
  }
}
