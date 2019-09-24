import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { graphqlSync } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import resolvers from "../posts_server/server";
import typeDefs from "raw-loader!../posts_server/schema.graphql";

const schema = makeExecutableSchema({ typeDefs, resolvers });
const store = new Store(new RecordSource());

const network = Network.create((operation, variables) => {
  console.log(variables);
  console.log(operation.text);
  const resp = graphqlSync(schema, operation.text, {}, undefined, variables);
  console.log(resp);
  return resp;
});

const environment = new Environment({ network, store });
export default environment;
