import React, { useEffect, useState } from "react";
import { graphql } from "react-relay";
import { createOperationDescriptor, getRequest } from "relay-runtime";
import CitiesBrowserPanel from "theapp/components/CitiesBrowserPanel";

export default function App({ environment }) {
  console.log("App");
  const [state, setState] = useState({ ready: false });
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
    const res = environment.lookup(operation.fragment, operation);
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
