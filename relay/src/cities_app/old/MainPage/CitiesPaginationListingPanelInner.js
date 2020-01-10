import React, { useState } from "react";
import { QueryRenderer, graphql } from "react-relay";
import CitiesPagination from "./CitiesPagination";

export default function CitiesPaginationListingPanelInner({
  searchParams,
  relayEnv
}) {
  console.log("CitiesPaginationListingPanelInner");
  const [pageNo, setPageNo] = useState(0);

  const loadNextPage = () => {
    setPageNo(pageNo + 1);
  };

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
            ...CitiesPagination_cities
          }
        }
      `}
      environment={relayEnv}
      variables={{ pageSize: 7, pageNo, searchParams }}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <h3>loading...</h3>;
        return (
          <CitiesPagination
            cities={props.citiesPagination}
            loadNextPage={loadNextPage}
          />
        );
      }}
    />
  );
}
