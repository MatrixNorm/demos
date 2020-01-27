import * as React from "react";
import { useEffect, useState } from "react";
import { graphql } from "react-relay";
import {
  createOperationDescriptor,
  getRequest,
  IEnvironment
} from "relay-runtime";
import CitiesBrowserPanel from "./components/CitiesBrowserPanel";
import { AppQueryResponse } from "./__generated__/AppQuery.graphql";

interface Props {
  environment: IEnvironment;
}

export default function App({ environment }: Props) {
  const [state, setState] = useState({ ready: false, searchParams: null });
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
    // @ts-ignore
    setState({ ready: true, searchParams: res.data.uiState.citySearchParams });
  }, []);

  if (state.ready) {
    return (
      <CitiesBrowserPanel
        searchParams={state.searchParams}
        environment={environment}
      />
    );
  } else {
    return null;
  }
}
