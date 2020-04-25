import * as React from "react";
import {
  QueryRenderer,
  graphql,
  createRefetchContainer,
  RelayRefetchProp,
} from "react-relay";
import { IEnvironment } from "relay-runtime";
import CitiesPagination from "./CitiesPagination";
import { SearchParametersType } from "./SearchParameters";

import { CitiesPagination_page } from "__relay__/CitiesPagination_page.graphql";
import { CitiesPaginationRefetchContainer_cities } from "__relay__/CitiesPaginationRefetchContainer_cities.graphql";
import { CitiesPaginationRefetchContainerQuery } from "__relay__/CitiesPaginationRefetchContainerQuery.graphql";

const loadNextPage = (relay: RelayRefetchProp) => (
  currentPage: CitiesPagination_page
) => {
  let { nodes } = currentPage;
  if (nodes && nodes.length > 0) {
    let after = nodes[nodes.length - 1].id;
    currentPage.hasNext &&
      relay.refetch((nextVars) => {
        return { ...nextVars, after };
      });
  }
};

const loadPrevPage = (relay: RelayRefetchProp) => (
  currentPage: CitiesPagination_page
) => {
  let { nodes } = currentPage;
  if (nodes && nodes.length > 0) {
    let before = nodes[0].id;
    currentPage.hasPrev &&
      relay.refetch((prevVars) => {
        return { ...prevVars, before };
      });
  }
};

const CitiesPaginationRefetchContainer = createRefetchContainer(
  ({
    cities,
    relay,
  }: {
    cities: CitiesPaginationRefetchContainer_cities;
    relay: RelayRefetchProp;
  }) => {
    return cities.citiesPagination ? (
      <CitiesPagination
        page={cities.citiesPagination}
        loadNextPage={loadNextPage(relay)}
        loadPrevPage={loadPrevPage(relay)}
      />
    ) : (
      <div>ERROR</div>
    );
  },
  {
    cities: graphql`
      fragment CitiesPaginationRefetchContainer_cities on Query
        @argumentDefinitions(
          pageSize: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
          searchParams: { type: "CitySearchParamsInput" }
        ) {
        citiesPagination(
          pageSize: $pageSize
          after: $after
          before: $before
          searchParams: $searchParams
        ) {
          ...CitiesPagination_page
        }
      }
    `,
  },
  graphql`
    query CitiesPaginationRefetchContainerRefetchQuery(
      $pageSize: Int
      $after: String
      $before: String
      $searchParams: CitySearchParamsInput
    ) {
      ...CitiesPaginationRefetchContainer_cities
        @arguments(
          pageSize: $pageSize
          after: $after
          before: $before
          searchParams: $searchParams
        )
    }
  `
);

type Props = {
  environment: IEnvironment;
  searchParams: SearchParametersType;
};

export default ({ environment, searchParams }: Props) => {
  console.log({ searchParams });
  return (
    <QueryRenderer<CitiesPaginationRefetchContainerQuery>
      query={graphql`
        query CitiesPaginationRefetchContainerQuery(
          $pageSize: Int
          $after: String
          $before: String
          $searchParams: CitySearchParamsInput
        ) {
          ...CitiesPaginationRefetchContainer_cities
            @arguments(
              pageSize: $pageSize
              after: $after
              before: $before
              searchParams: $searchParams
            )
        }
      `}
      environment={environment}
      variables={{ searchParams }}
      render={({ props }) => {
        return props && <CitiesPaginationRefetchContainer cities={props} />;
      }}
    />
  );
};
