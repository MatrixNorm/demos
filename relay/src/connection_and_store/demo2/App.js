// @flow

import { QueryRenderer, graphql } from "react-relay";
import React from "react";

import environment from "./env";
import CityFeed from "./CityFeed";
import type { AppQueryResponse } from "./__generated__/AppQuery.graphql";

type Props = {
  error: ?Error,
  props: ?AppQueryResponse
};

const render = ({ error, props }: Props) => {
  if (error) {
    return <h1>fook: {error.toString()}</h1>;
  }
  if (props) {
    return <CityFeed cities={props} />;
  }
};

const AppQuery = graphql`
  query AppQuery($count: Int, $cursor: String) {
    ...CityFeed_cities
      @arguments(count: $count, cursor: $cursor)
  }
`;

const App = () => {
  return (
    <QueryRenderer
      query={AppQuery}
      environment={environment}
      variables={{ count: 3, cursor: null }}
      render={render}
    />
  );
};

export default App;
