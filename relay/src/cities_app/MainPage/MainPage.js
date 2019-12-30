import React, { useEffect, useRef } from "react";
import { QueryRenderer, graphql } from "react-relay";
import styled from "styled-components";
import environment from "theapp/env";
import CitiesPaginationParametersPanel from "./CitiesPaginationParametersPanel";
import CitiesPaginationListingPanel from "./CitiesPaginationListingPanel";
import CitiesPaginationListingPanelWithQR from "./CitiesPaginationListingPanelWithQR";

const WithStyle = styled.div`
  .main-page {
    display: flex;
  }
`;

export default function MainPage() {
  return (
    <QueryRenderer
      query={graphql`
        query MainPageQuery($pageSize: Int!, $pageNo: Int!) {
          citiesMetadata {
            ...CitiesPaginationParametersPanel_metadata
          }
          citiesPagination(pageNo: $pageNo, pageSize: $pageSize) {
            ...CitiesPaginationListingPanel_cities
              @arguments(pageNo: $pageNo, pageSize: $pageSize)
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
  const isInitialRender = useRef(true);

  useEffect(() => {
    isInitialRender.current = false;
  }, []);

  return (
    <WithStyle>
      <div className="main-page">
        <CitiesPaginationParametersPanel metadata={props.citiesMetadata} />
        {isInitialRender ? (
          <CitiesPaginationListingPanel cities={props.citiesPagination} />
        ) : (
          <CitiesPaginationListingPanelWithQR
            searchParams={uiState.searchParams}
            relayEnv={environment}
          />
        )}
      </div>
    </WithStyle>
  );
}
