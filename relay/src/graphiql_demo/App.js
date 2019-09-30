import React, { useRef } from "react";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import GraphiQL from "graphiql";
import typeDefs from "raw-loader!./schema.graphql";
import citiesData from "./data";

const resolvers = {
  Query: {
    cities: (_, args) => {
      const nodes = citiesData.slice(0, 4);
      const edges = nodes.map(node => ({ node, cursor: node.id }));
      const pageInfo = {
        hasNextPage: true,
        hasPreviousPage: false,
        startCursor: nodes[0].id,
        endCursor: nodes[nodes.length - 1].id
      };
      return { edges, pageInfo };
    }
  },
  Node: {
    __resolveType(node) {
      return node;
    }
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

async function fetcher(graphQLParams) {
  console.log(graphQLParams)
  const resp = await graphql(schema, graphQLParams.query, {}, undefined, {});
  console.log(resp);
  return resp;
}

const App = () => {
  const giEl = useRef(null);
  window.xxx = giEl;
  return <GraphiQL ref={giEl} fetcher={fetcher} schema={schema} />;
};

export default App;
