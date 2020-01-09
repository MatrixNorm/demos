import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import typeDefs from "raw-loader!./schema.graphql";

const resolvers = {
  Query: {
    pi: (_, { precision }) => {
      return Number(Math.PI.toFixed(precision));
    }
  },
  Node: {
    __resolveType(node: Node) {
      return node
    }
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });
const store = new Store(new RecordSource());

const network = Network.create(async (operation, variables) => {
  await new Promise(resolve => setTimeout(resolve, 1));
  return await graphql(schema, operation.text, {}, undefined, variables);
});

export default new Environment({ network, store });
