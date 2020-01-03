import React from "react";
import { QueryRenderer, graphql } from "react-relay";
import Pagination from "./Pagination";

export default function App({ env }) {
  return (
    <QueryRenderer
      query={graphql`
        query AppQuery($pageNo: Int!) {
          ...Pagination_cities @arguments(pageNo: $pageNo)
        }
      `}
      environment={env}
      variables={{ pageNo: 0 }}
      render={({ error, props }) => {
        if (error) return <h3>error...</h3>;
        if (!props) return <h3>loading...</h3>;
        console.log("QueryRenderer");
        return <Pagination cities={props} />;
      }}
    />
  );
}
