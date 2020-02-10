import * as React from "react";
import {
  QueryRenderer,
  graphql,
  createRefetchContainer,
  RelayRefetchProp
} from "react-relay";

import { createRelayEnvironment } from "../env";
import CitiesPagination, {
  loadNextPage,
  loadPrevPage
} from "../components/CitiesPagination";

import { CitiesPaginationRefetchStory_cities } from "__relay__/CitiesPaginationRefetchStory_cities.graphql";
import { CitiesPaginationRefetchStoryQuery } from "__relay__/CitiesPaginationRefetchStoryQuery.graphql";
import * as t from "../types.codegen";

export default { title: "cities_app-demo1/CitiesPaginationRefetch" };

type Props = {
  cities: CitiesPaginationRefetchStory_cities;
  relay: RelayRefetchProp;
};

export const fullCase = () => {
  const environment = createRelayEnvironment();
  const RefetchContainer = createRefetchContainer(
    ({ cities, relay }: Props) => {
      console.log(cities);
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
        fragment CitiesPaginationRefetchStory_cities on Query
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
      `
    },
    graphql`
      query CitiesPaginationRefetchStoryRefetchQuery(
        $pageSize: Int
        $after: String
        $before: String
        $searchParams: CitySearchParamsInput
      ) {
        ...CitiesPaginationRefetchStory_cities
          @arguments(
            pageSize: $pageSize
            after: $after
            before: $before
            searchParams: $searchParams
          )
      }
    `
  );
  return (
    <QueryRenderer<CitiesPaginationRefetchStoryQuery>
      query={graphql`
        query CitiesPaginationRefetchStoryQuery(
          $pageSize: Int
          $after: String
          $before: String
          $searchParams: CitySearchParamsInput
        ) {
          ...CitiesPaginationRefetchStory_cities
            @arguments(
              pageSize: $pageSize
              after: $after
              before: $before
              searchParams: $searchParams
            )
        }
      `}
      environment={environment}
      variables={{}}
      render={({ props }) => {
        return props && <RefetchContainer cities={props} />;
      }}
    />
  );
};
