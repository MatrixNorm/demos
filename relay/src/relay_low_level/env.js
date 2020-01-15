import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { commitLocalUpdate } from "react-relay";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import typeDefs from "raw-loader!./schema.graphql";
import cities from "./cities";

const resolvers = {
  Query: {
    cities: (_, { pageNo }) => {
      let pageSize = 5;
      let nodes = cities.slice(pageNo * pageSize, pageNo * pageSize + pageSize);
      return {
        nodes,
        pageNo,
        hasNextPage: pageNo * pageSize < cities.length,
        hasPrevPage: pageNo > 0
      };
    }
  },
  Node: {
    __resolveType(node) {
      console.log({ node });
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
window.printStore = () => {
  console.log(env.getStore().getSource()._records);
};
export default env;
