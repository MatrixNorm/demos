import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { commitLocalUpdate } from "react-relay";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import typeDefs from "raw-loader!./schema.graphql";

const resolvers = {
  Query: {
    persons: () => {
      return [
        {
          id: "p1",
          name: "bob",
          address: {
            id: "a1",
            state: "US",
            city: { id: "c1", name: "New York" }
          }
        },
        {
          id: "p2",
          name: "mary",
          address: {
            id: "a1",
            state: "US",
            city: { id: "c1", name: "New York" }
          }
        },
        {
          id: "p3",
          name: "paulo",
          address: {
            id: "a2",
            state: "Italy",
            city: { id: "c2", name: "Milan" }
          }
        }
      ];
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
  //console.log(operation.text, variables);
  await new Promise(resolve => setTimeout(resolve, 10));
  const resp = await graphql(schema, operation.text, {}, undefined, variables);
  console.log(resp);
  return resp;
});

const env = new Environment({ network, store });
window.relayStore = env.getStore().getSource();
window.commitLocalUpdate = function(callback) {
  commitLocalUpdate(env, callback);
};
export default env;
