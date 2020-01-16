import React, { useEffect, useState } from "react";
import { graphql } from "react-relay";
import { createOperationDescriptor, getRequest } from "relay-runtime";
import styled from "styled-components";
import environment from "theapp/env";
import CitiesBrowserPanel from "theapp/components/CitiesBrowserPanel";

const WithStyle = styled.div`
  .main-page {
    display: flex;
  }

  .search-parameters-panel {
    width: 150px;
  }

  .pagination-panel {
    width: 350px;
  }
`;

export default function App() {
  console.log("App");
  const [state, setState] = useState({ready: false});
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
    const res = environment.lookup(operation.fragment, operation)
    console.log(res)
    setState({ready: true, searchParams: res.data.uiState.citySearchParams});
  }, []);

  return (
    <div>
      {state.ready && (
        <CitiesBrowserPanel
          searchParams={state.searchParams}
          environment={environment}
        />
      )}
    </div>
  );
}
