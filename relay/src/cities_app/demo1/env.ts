import {
  commitLocalUpdate,
  Environment,
  Network,
  RecordSource,
  Store
} from "relay-runtime";
import { graphql, graphqlSync } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
// @ts-ignore
import serverSchemaTxt from "raw-loader!./resources/serverSchema.graphql";
import { serverResolvers, users } from "./resolvers";

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
      { user: users["user1"] },
      variables
    );
    console.log(resp);
    return resp;
  });

  const store = new Store(new RecordSource());
  const environment = new Environment({ network, store });

  commitLocalUpdate(environment, store => {
    const uiStateId = "client:UIState";
    const uiState = store.create(uiStateId, "UIState");
    environment.retain({
      dataID: uiStateId,
      variables: {},
      node: { selections: [] }
    });
    store.getRoot().setLinkedRecord(uiState, "uiState");
  });

  window.printStore = () => {
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
      { user: users["user1"] },
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
