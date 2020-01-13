import React from "react";
import { createRefetchContainer, QueryRenderer, graphql } from "react-relay";
import SearchParameters from "./SearchParameters";
import Pagination from "./Pagination";

const CitiesBrowserPanel = createRefetchContainer(
  ({ cities, metadata, initialSearchParams, relay }) => {
    return (
      <>
        <SearchParameters
          metadata={metadata}
          initialSearchParams={initialSearchParams}
          refetch={relay.refetch}
        />
        <Pagination cities={cities} refetch={relay.refetch} />
      </>
    );
  },
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
          nodes {
            id
            name
            country
            population
            lat
            lng
          }
          hasNextPage
          hasPrevPage
          pageNo
        }
      }
    `,
    metadata: graphql`
      fragment CitiesBrowserPanel_metadata on Query {
        citiesMetadata {
          populationLowerBound
          populationUpperBound
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
    }
  `
);

export default function CitiesBrowserPanelQR({ searchParams, relay }) {
  console.log("CitiesBrowserPanelQR");
  return (
    <QueryRenderer
      query={graphql`
        query CitiesBrowserPanelQuery(
          $pageNo: Int!
          $pageSize: Int!
          $searchParams: CitySearchParamsInput
        ) {
          ...CitiesBrowserPanel_cities
          ...CitiesBrowserPanel_metadata
        }
      `}
      environment={relay.environment}
      variables={{ pageSize: 7, pageNo: 0, searchParams }}
      render={({ error, props }) => {
        if (error) return <h3>error</h3>;
        if (!props) return <h3>loading...</h3>;
        return (
          <CitiesBrowserPanel
            cities={props}
            metadata={props}
            initialSearchParams={searchParams}
          />
        );
      }}
    />
  );
}
