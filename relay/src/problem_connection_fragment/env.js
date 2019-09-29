import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
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
const store = new Store(new RecordSource());

const network = Network.create(async (operation, variables) => {
  await new Promise(resolve => setTimeout(resolve, 30));
  const resp = await graphql(schema, operation.text, {}, undefined, variables);
  //console.log(resp)
  return resp;
});

export default new Environment({ network, store });
