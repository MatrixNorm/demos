import Reactfrom "react";
import { QueryRenderer, graphql } from "react-relay";
import CitiesPagination from "./CitiesPagination";

export default function CitiesBrowserPanel({ searchParams, relay }) {
  console.log("CitiesBrowserPanel");
  return (
    <QueryRenderer
      query={graphql`
        query CitiesBrowserPanelQuery(
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
      variables={{ pageSize: 7, pageNo: 0, searchParams }}
      render={({ error, props }) => {
        if (error) return <h3>error</h3>;
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
