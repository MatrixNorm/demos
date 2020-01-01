import React from "react";
import { QueryRenderer, graphql } from "react-relay";
import CitiesPagination from "./CitiesPagination";

export default function CitiesPaginationListingPanelInner({
  searchParams,
  relayEnv
}) {
  console.log("CitiesPaginationListingPanelInner");
  return (
    <QueryRenderer
      query={graphql`
        query CitiesPaginationListingPanelInnerQuery(
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
          }
        }
      `}
      environment={relayEnv}
      variables={{ pageSize: 10, pageNo: 0, searchParams }}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <h3>loading...</h3>;
        return <CitiesPagination cities={props.citiesPagination} />;
      }}
    />
  );
}
