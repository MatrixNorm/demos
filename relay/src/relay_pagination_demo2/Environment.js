import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import resolvers from "../posts_server/server";
import typeDefs from "raw-loader!../posts_server/schema.graphql";

const schema = makeExecutableSchema({ typeDefs, resolvers });
const store = new Store(new RecordSource());

const network = Network.create(async (operation, variables) => {
  console.log(variables);
  console.log(operation.text);
  await new Promise(resolve => setTimeout(resolve, 3000))
  return await graphql(schema, operation.text, {}, undefined, variables);
});

export default new Environment({ network, store });
