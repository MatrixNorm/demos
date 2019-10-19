import { QueryRenderer, graphql } from "react-relay";
import React from "react";
import environment from "./env";

const render = ({ error, props }) => {
  if (error) {
    return <h1>fook: {error.toString()}</h1>;
  }
  if (props) {
    return (
      <>
        <h3>{JSON.stringify(props.foo)}</h3>
        <br />
        <h3>{JSON.stringify(props.user1)}</h3>
        <br />
        <h3>{JSON.stringify(props.user2)}</h3>
      </>
    );
  }
};

const AppQuery = graphql`
  query AppQuery($userId1: ID!, $userId2: ID!) {
    foo {
      bar {
        baz {
          hi
        }
      }
    }
    user1: user(id: $userId1) {
      id
      name
      address {
        state
        city {
          id
          name
        }
      }
    }
    user2: user(id: $userId2) {
      id
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
      variables={{ userId1: "user#111", userId2: "user#222" }}
      render={render}
    />
  );
};

export default App;
