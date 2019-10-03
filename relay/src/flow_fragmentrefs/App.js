// @flow

import { QueryRenderer, graphql } from "react-relay";
import React from "react";

import environment from "./env";
import City from "./City";
import type { AppQueryResponse } from "./__generated__/AppQuery.graphql";

type Props = {
  error: ?Error,
  props: ?AppQueryResponse
}

const render = ({ error, props }: Props) => {
  if (error) {
    return <h1>fook: {error.toString()}</h1>
  }
  if (props && props.randomCity) {
    return <City city={props.randomCity} />;
  }  
};

const AppQuery = graphql`
  query AppQuery {
    randomCity {
      ...City_city
    }
  }
`;

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
