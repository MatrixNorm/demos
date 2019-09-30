import { QueryRenderer, graphql } from "react-relay";
import React from "react";

import environment from "./env";
import CitiesPagination from "./CitiesPagination";

const AppQuery = graphql`
  query AppQuery($first: Int, $after: String) {
    ...CitiesPagination_cities @arguments(first: $first, after: $after)
  }
`;

const render = ({ error, props }) => {
  if (error) {
    return <h1>scheise</h1>;
  }
  if (!props) {
    return <h1>Loading...</h1>;
  }
  return <CitiesPagination cities={props} />;
};

const App = () => {
  return (
    <QueryRenderer
      query={AppQuery}
      environment={environment}
      variables={{ first: 3, after: null }}
      render={render}
    />
  );
};

export default App;
