import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import schemaTxt from "raw-loader!./schema.graphql";
import resolvers from "./resolvers";

const schema = makeExecutableSchema({
  typeDefs: schemaTxt,
  resolvers: resolvers
});

const network = Network.create(async (operation, variables) => {
  console.log(operation.text)
  await new Promise(resolve => setTimeout(resolve, 2000));
  const resp = await graphql(
    schema,
    operation.text,
    {},
    undefined,
    variables
  );
  console.log(resp);
  return resp;
});

const store = new Store(new RecordSource());
const environment = new Environment({ network, store });

window.relayEnv = environment;
export default environment;
