// @flow

import { QueryRenderer, graphql } from "react-relay";
import React from "react";

import environment from "./env";
import PiComponent from "./PiComponent";

const AppQuery = graphql`
  query AppQuery($precision: Int) {
    pi(precision: $precision)
  }
`;

const render = ({ error, props }) => {
  if (error) {
    return <h1>scheise</h1>;
  }
  if (!props) {
    return <h1>Loading...</h1>;
  }
  return <PiComponent pi={props.pi} />;
};

const App = () => {
  return (
    <QueryRenderer
      query={AppQuery}
      environment={environment}
      variables={{ precision: 3 }}
      render={render}
    />
  );
};

export default App;
