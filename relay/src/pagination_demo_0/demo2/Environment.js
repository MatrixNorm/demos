import {
  Environment,
  Network,
  RecordSource,
  Store,
  commitLocalUpdate
} from "relay-runtime";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import resolvers from "../posts_server/server";
import typeDefs from "raw-loader!../posts_server/schema.graphql";

const schema = makeExecutableSchema({ typeDefs, resolvers });
const store = new Store(new RecordSource());

const network = Network.create(async (operation, variables) => {
  console.log(operation.text, variables);
  await new Promise(resolve => setTimeout(resolve, 500));
  const resp = await graphql(schema, operation.text, {}, undefined, variables);
  console.log(resp);
  return resp;
});

const environment = new Environment({ network, store });

window.relayEnv = environment;
export default environment;
