import React, { useState } from "react";
import { QueryRenderer, graphql } from "react-relay";
import Pagination from "./Pagination";

export default function App({ env }) {
  const [pageNo, setPageNo] = useState(0);

  const loadNextPage = () => {
    setPageNo(pageNo + 1);
  };

  return (
    <QueryRenderer
      query={graphql`
        query AppQuery($pageNo: Int!) {
          cities(pageNo: $pageNo) {
            ...Pagination_cities
          }
        }
      `}
      environment={env}
      variables={{ pageNo }}
      render={({ error, props }) => {
        if (error) return <h3>error...</h3>;
        if (!props) return <h3>loading...</h3>;
        console.log("QueryRenderer");
        return <Pagination cities={props.cities} loadNextPage={loadNextPage} />;
      }}
    />
  );
}
