// @flow

import { QueryRenderer, graphql } from "react-relay";
import React from "react";

import environment from "./env";
import CityList from "./CityList";
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
    return <CityList cities={props} />;
  }
};

const AppQuery = graphql`
  query AppQuery($first: Int, $after: String, $last: Int, $before: String) {
    ...CityList_cities
      @arguments(first: $first, after: $after, last: $last, before: $before)
  }
`;

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
