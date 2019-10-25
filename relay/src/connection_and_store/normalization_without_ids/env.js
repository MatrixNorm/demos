import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import typeDefs from "raw-loader!./schema.graphql";

const resolvers = {
  Query: {
    foo: () => {
      return {
        bar: {
          baz: {
            hi: "kek"
          }
        }
      };
    },
    user: (_, { id }) => {
      return {
        id,
        name: "Bob",
        address: {
          id: "address#2",
          state: "Colorado",
          city: {
            id: "city#3",
            name: "Denver"
          }
        }
      };
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

const env = new Environment({ network, store });
window.relayEnv = env;
export default env;
