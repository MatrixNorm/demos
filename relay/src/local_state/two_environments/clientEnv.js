import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import combinedSchemaTxt from "raw-loader!./data/combinedSchema.graphql";
import { clientResolvers } from "./resolvers";

const combinedSchema = makeExecutableSchema({
  typeDefs: combinedSchemaTxt,
  resolvers: clientResolvers
});

const network = Network.create(async (operation, variables) => {
  const resp = await graphql(
    combinedSchema,
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
