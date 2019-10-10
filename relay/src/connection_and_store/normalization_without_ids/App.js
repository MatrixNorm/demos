import { QueryRenderer, graphql } from "react-relay";
import React from "react";

import environment from "./env";


const render = ({ error, props }: Props) => {
  console.log(props)
  if (error) {
    return <h1>fook: {error.toString()}</h1>;
  }
  if (props) {
    return (<>
      <h3>{JSON.stringify(props.foo)}</h3>
      <br/>
      <h3>{JSON.stringify(props.user)}</h3>
    </>);
  }
};

const AppQuery = graphql`
  query AppQuery {
    foo {
      bar {
        baz {
          hi
        }
      }
    }
    user {
      name
      address {
        state
        city {
          id
          name
        }
      }
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
