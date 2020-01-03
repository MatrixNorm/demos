import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import serverSchemaTxt from "raw-loader!./schema.graphql";
import { serverResolvers } from "./resolvers";

const serverSchema = makeExecutableSchema({
  typeDefs: serverSchemaTxt,
  resolvers: serverResolvers
});

export default function makeEnv() {
  const network = Network.create(async (operation, variables) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const resp = await graphql(
      serverSchema,
      operation.text,
      {},
      undefined,
      variables
    );
    console.log("Network", resp);
    return resp;
  });

  const store = new Store(new RecordSource());
  const environment = new Environment({ network, store });

  window.printStore = () => {
    console.log(environment.getStore().getSource()._records);
  };
  return environment;
}
