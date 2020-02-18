import { Environment, Network, RecordSource, Store } from "relay-runtime";
// @ts-ignore
import { graphql, graphqlSync } from "graphql";
// @ts-ignore
import { makeExecutableSchema } from "graphql-tools";
// @ts-ignore
import serverSchemaTxt from "raw-loader!./resources/serverSchema.graphql";
import { serverResolvers } from "./resolvers/index";
import * as db from "./resolvers/database";

const serverSchema = makeExecutableSchema({
  typeDefs: serverSchemaTxt,
  resolvers: serverResolvers
});

export const createRelayEnvironment = () => {
  const network = Network.create(async (operation, variables) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const resp = await graphql(
      serverSchema,
      operation.text,
      {},
      { user: db.users["user#1"] },
      variables
    );
    console.log({resp});
    return resp;
  });
  const store = new Store(new RecordSource());
  const environment = new Environment({ network, store });
  // @ts-ignore
  window.printStore = () => {
    // @ts-ignore
    console.log(environment.getStore().getSource()._records);
  };

  return environment;
};

export const createTestingEnv = (resolvers: any) => {
  const executableSchema = makeExecutableSchema({
    typeDefs: serverSchemaTxt,
    resolvers: resolvers
  });

  const network = Network.create((operation, variables) => {
    const resp = graphqlSync(
      executableSchema,
      operation.text,
      {},
      {},
      variables
    );
    console.log(resp);
    return resp;
  });

  const store = new Store(new RecordSource());
  const environment = new Environment({ network, store });
  return environment;
};

export const loadingForeverEnvironment = () => {
  const network = Network.create(async () => {
    while (true) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  });

  const store = new Store(new RecordSource());
  const environment = new Environment({ network, store });
  return environment;
};
