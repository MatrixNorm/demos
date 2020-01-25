import React from "react";
import { createRefetchContainer, QueryRenderer, graphql } from "react-relay";
import styled from "styled-components";
import SearchParameters from "./SearchParameters";
import CitiesPagination from "./CitiesPagination";
import LoadingIndicator from "theapp/elements/LoadingIndicator";
import LoadingError from "theapp/elements/LoadingError";

const WithStyle = styled.div`
  .outer-panel {
    display: flex;
  }

  .search-params {
    width: 150px;
  }

  .pagination-panel {
    width: 350px;
  }
`;

const CitiesBrowserPanel = ({
  cities,
  searchMetadata,
  initialSearchParams,
  relay
}) => {
  return (
    <WithStyle>
      <div className="outer-panel">
        <div className="search-params">
          <SearchParameters
            metadata={searchMetadata.citiesMetadata}
            initialSearchParams={initialSearchParams}
            environment={relay.environment}
            refetch={relay.refetch}
          />
        </div>
        <div className="pagination-panel">
          <CitiesPagination cities={cities.citiesPagination} relay={relay} />
        </div>
      </div>
    </WithStyle>
  );
};

const CitiesBrowserPanelRC = createRefetchContainer(
  CitiesBrowserPanel,
  {
    cities: graphql`
      fragment CitiesBrowserPanel_cities on Query
        @argumentDefinitions(
          pageNo: { type: "Int!" }
          pageSize: { type: "Int!" }
          searchParams: { type: "CitySearchParamsInput" }
        ) {
        citiesPagination(
          pageNo: $pageNo
          pageSize: $pageSize
          searchParams: $searchParams
        ) {
          ...CitiesPage_page
        }
      }
    `,
    searchMetadata: graphql`
      fragment CitiesBrowserPanel_searchMetadata on Query {
        citiesMetadata {
          ...SearchParameters_metadata
        }
      }
    `
  },
  graphql`
    query CitiesBrowserPanelRefetchQuery(
      $pageNo: Int!
      $pageSize: Int!
      $searchParams: CitySearchParamsInput
    ) {
      ...CitiesBrowserPanel_cities
        @arguments(
          pageNo: $pageNo
          pageSize: $pageSize
          searchParams: $searchParams
        )
    }
  `
);

export default function CitiesBrowserPanelQR({ searchParams, environment }) {
  console.log("CitiesBrowserPanelQR", searchParams, environment);
  return (
    <QueryRenderer
      query={graphql`
        query CitiesBrowserPanelQuery(
          $pageNo: Int!
          $pageSize: Int!
          $searchParams: CitySearchParamsInput
        ) {
          ...CitiesBrowserPanel_cities
            @arguments(
              pageNo: $pageNo
              pageSize: $pageSize
              searchParams: $searchParams
            )
          ...CitiesBrowserPanel_searchMetadata
        }
      `}
      environment={environment}
      variables={{ pageSize: 5, pageNo: 0, searchParams }}
      render={({ error, props }) => {
        return (
          <div className="cities-browser-panel">
            {error ? (
              <LoadingError />
            ) : props ? (
              <CitiesBrowserPanelRC
                cities={props}
                searchMetadata={props}
                initialSearchParams={searchParams}
              />
            ) : (
              <LoadingIndicator />
            )}
          </div>
        );
      }}
    />
  );
}
