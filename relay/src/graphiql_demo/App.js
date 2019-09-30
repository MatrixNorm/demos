import React, { useRef } from "react";
import { graphql, buildSchema } from "graphql";
import GraphiQL from "graphiql";
import schemaSDL from "raw-loader!./schema.graphql";

const schema = buildSchema(schemaSDL);

async function fetcher(graphQLParams) {
  const resp = await graphql(schema, graphQLParams, {}, undefined, {});
  console.log(resp);
  return resp;
}

const App = () => {
  const giEl = useRef(null);
  window.xxx = giEl;
  return <GraphiQL ref={giEl} fetcher={fetcher} schema={schema} />;
};

export default App;
