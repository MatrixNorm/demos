import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import typeDefs from "raw-loader!./schema.graphql";
import citiesData from "./data";

const resolvers = {
  Query: {
    randomCity: () => {
      const index = Math.floor(citiesData.length * Math.random())
      return citiesData[index]
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
  await new Promise(resolve => setTimeout(resolve, 10));
  const resp = await graphql(schema, operation.text, {}, undefined, variables);
  return resp;
});

export default new Environment({ network, store });
