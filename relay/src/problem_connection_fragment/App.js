import { QueryRenderer, graphql } from "react-relay";
import React from "react";

import environment from "./env";
import CitiesList from "./CitiesList";

const AppQuery = graphql`
  query AppQuery {
    cities {
      ...CitiesList_conn
    }
  }
`;

const render = ({ error, props }) => {
  if (error) {
    return <h1>scheise</h1>;
  }
  if (!props) {
    return <h1>Loading...</h1>;
  }
  return <CitiesList conn={props.cities} />;
};

const App = () => {
  return (
    <QueryRenderer
      query={AppQuery}
      environment={environment}
      variables={{}}
      render={render}
    />
  );
};

export default App;
