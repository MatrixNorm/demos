import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import serverSchemaTxt from "raw-loader!theapp/resources/serverSchema.graphql";
import { serverResolvers } from "theapp/mock/resolvers";

const serverSchema = makeExecutableSchema({
  typeDefs: serverSchemaTxt,
  resolvers: serverResolvers
});

const network = Network.create(async (operation, variables) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const resp = await graphql(
    serverSchema,
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
