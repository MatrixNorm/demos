import React from "react";
import { graphql } from "graphql";
import GraphiQL from "graphiql";
import schema from "./gql";

async function fetcher(graphQLParams) {
  console.log(graphQLParams);
  const resp = await graphql(schema, graphQLParams.query, {}, undefined, {});
  console.log(resp);
  return resp;
}

const App = () => {
  return <GraphiQL fetcher={fetcher} schema={schema} />;
};

export default App;
