import * as React from "react";
import { QueryRenderer, graphql } from "react-relay";

import { createRelayEnvironment } from "../env";
import CitiesPaginationRefetchContainer from "../components/CitiesPaginationRefetchContainer";
import { CitiesPaginationRefetchContainerStoryQuery } from "__relay__/CitiesPaginationRefetchContainerStoryQuery.graphql";

export default { title: "cities_app-demo1/CitiesPaginationRefetchContainer" };

export const fullCase = () => {
  const environment = createRelayEnvironment();
  return (
    <QueryRenderer<CitiesPaginationRefetchContainerStoryQuery>
      query={graphql`
        query CitiesPaginationRefetchContainerStoryQuery(
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
      variables={{}}
      render={({ props }) => {
        return props && <CitiesPaginationRefetchContainer cities={props} />;
      }}
    />
  );
};
