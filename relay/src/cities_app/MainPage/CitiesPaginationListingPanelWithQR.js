import React from "react";
import { QueryRenderer, graphql } from "react-relay";
import CitiesPaginationListingPanel from "./CitiesPaginationListingPanel";

export default function CitiesPaginationListingPanelWithQR({
  searchParams,
  relayEnv
}) {
  return (
    <QueryRenderer
      query={graphql`
        query CitiesPaginationListingPanelWithQR(
          $pageNo: Int!
          $pageSize: Int!
          $searchParams: CitySearchParamsInput
        ) {
          citiesPagination(
            pageNo: $pageNo
            pageSize: $pageSize
            searchParams: $searchParams
          ) {
            ...CitiesPaginationListingPanel_cities
              @arguments(
                pageNo: $pageNo
                pageSize: $pageSize
                searchParams: $searchParams
              )
            nodes {
              name
              country
              population
              lat
              lng
            }
            pageNo
            hasNextPage
            hasPrevPage
          }
        }
      `}
      environment={relayEnv}
      variables={{ pageSize: 10, pageNo: 0, searchParams }}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <h3>loading...</h3>;
        return <CitiesPaginationListingPanel cities={props.citiesPagination} />;
      }}
    />
  );
}
