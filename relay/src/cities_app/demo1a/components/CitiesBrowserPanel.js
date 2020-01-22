import React from "react";
import { createRefetchContainer, QueryRenderer, graphql } from "react-relay";
import SearchParameters from "./SearchParameters";
import CitiesPagination from "./CitiesPagination";

const CitiesBrowserPanel = createRefetchContainer(
  ({ cities, metadata, initialSearchParams, relay, children }) => {
    return (
      <>
        {React.Children.map(children, child => {
          if (child.type === SearchParameters) {
            return React.cloneElement(child, {
              metadata,
              initialSearchParams,
              relay
            });
          }
          if (child.type === CitiesPagination) {
            return React.cloneElement(child, {
              cities: cities.citiesPagination,
              relay
            });
          }
          return child;
        })}
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
        @arguments(
          pageNo: $pageNo
          pageSize: $pageSize
          searchParams: $searchParams
        )
    }
  `
);

export default function CitiesBrowserPanelQR({
  searchParams,
  environment,
  children
}) {
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
          ...CitiesBrowserPanel_metadata
        }
      `}
      environment={environment}
      variables={{ pageSize: 5, pageNo: 0, searchParams }}
      render={({ error, props }) => {
        if (error) return <h3>error</h3>;
        if (!props) return <h3>loading...</h3>;
        return (
          <CitiesBrowserPanel
            cities={props}
            metadata={props}
            initialSearchParams={searchParams}
          >
            {children}
          </CitiesBrowserPanel>
        );
      }}
    />
  );
}