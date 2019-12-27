import React, { useReducer } from "react";
import { QueryRenderer, graphql } from "react-relay";
import environment from "theapp/env";
import CitiesPaginationParametersPanel from "./CitiesPaginationParametersPanel";
import CitiesPaginationListingPanel from "./CitiesPaginationListingPanel";

export default function MainPage() {
  return (
    <QueryRenderer
      query={graphql`
        query MainPageQuery($pageSize: Int!, $pageNo: Int!) {
          citiesMetadata {
            ...CitiesPaginationParametersPanel_metadata
          }
          viewer {
            citiesPaginationWithPinnedFilter(
              pageNo: $pageNo
              pageSize: $pageSize
            ) {
              ...CitiesPaginationListingPanel_cities
                @arguments(pageNo: $pageNo, pageSize: $pageSize)
            }
          }
        }
      `}
      environment={environment}
      variables={{ pageSize: 10, pageNo: 0 }}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <h3>loading...</h3>;
        return <Inner props={props} />;
      }}
    />
  );
}

function Inner({ props }) {
  const [uiState, dispatch] = useReducer({ filters: null });
  return (
    <div>
      <CitiesPaginationParametersPanel
        metadata={props.citiesMetadata}
        dispatch={dispatch}
      />
      <CitiesPaginationListingPanel
        cities={props.viewer.citiesPaginationWithPinnedFilter}
        filters={uiState.filters}
      />
    </div>
  );
}
