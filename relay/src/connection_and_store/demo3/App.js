import { QueryRenderer, graphql } from "react-relay";
import React from "react";
import environment from "./env";

const AppQuery = graphql`
  query AppQuery {
    persons {
      id
      name
      address {
        id
        state
        city {
          id
          name
        }
      }
    }
  }
`;

export const App = () => {
  return (
    <QueryRenderer
      query={AppQuery}
      environment={environment}
      variables={{ userId1: "user#111", userId2: "user#222" }}
      render={render}
    />
  );
};

function render({ error, props }) {
  if (error) {
    return <h1>fook: {error.toString()}</h1>;
  }
  if (props) {
    return (
      <ul>
        {props.persons.map(p => (
          <li key={p.id}>
            <Person person={p} />
          </li>
        ))}
      </ul>
    );
  }
}

function Person({ person }) {
  return (
    <>
      <div>{person.id}</div>
      <div>{person.name}</div>
      <div>{person.address.state}</div>
      <div>{person.address.city.name}</div>
    </>
  );
}
