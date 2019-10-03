// @flow

import { QueryRenderer, graphql } from "react-relay";
import React from "react";

import environment from "./env";
import City from "./City";
import type { AppQueryResponse } from "./__generated__/AppQuery.graphql";


const render = ({ props }: {props: ?AppQueryResponse}) => {
  if (props) {
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
