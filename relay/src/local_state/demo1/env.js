import { Environment, Network, RecordSource, Store, commitLocalUpdate } from "relay-runtime";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import typeDefs from "raw-loader!./schema.graphql";

const resolvers = {
  Query: {
    remote: () => {
      return "REMOTE";
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
  console.log(operation.text, variables);
  await new Promise(resolve => setTimeout(resolve, 10));
  const resp = await graphql(schema, operation.text, {}, undefined, variables);
  console.log(resp);
  return resp;
});

const environment = new Environment({ network, store });

commitLocalUpdate(environment, store => {
  store.getRoot().setValue("LOCAL", "local");
});

window.relayEnv = environment;
export default environment;
