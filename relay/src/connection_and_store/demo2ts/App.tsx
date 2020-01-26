import { QueryRenderer, graphql } from "react-relay";
import * as React from "react";
import environment from "./env";
import CityFeed from "./CityFeed";

const render = ({ error, props }) => {
  if (error) {
    return <h1>fook: {error.toString()}</h1>;
  }
  if (props) {
    return <CityFeed cities={props} />;
  }
};

const AppQuery = graphql`
  query AppQuery($count: Int, $cursor: String) {
    ...CityFeed_cities @arguments(count: $count, cursor: $cursor)
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
