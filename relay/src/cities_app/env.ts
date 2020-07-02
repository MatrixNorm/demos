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
  resolvers: serverResolvers,
});

export const createRelayEnvironment = (
  { timeout }: { timeout: number } = { timeout: 500 }
) => {
  const network = Network.create(async (operation, variables) => {
    await new Promise((resolve) => setTimeout(resolve, timeout));
    const resp = await graphql(
      serverSchema,
      operation.text,
      {},
      { user: db.users["user#1"] },
      variables
    );
    console.log({ resp });
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

export const createTestingEnv = (resolvers: object) => {
  const executableSchema = makeExecutableSchema({
    typeDefs: serverSchemaTxt,
    resolvers: resolvers,
  });

  const network = Network.create((operation, variables) => {
    const resp = graphqlSync(executableSchema, operation.text, {}, {}, variables);
    return resp;
  });

  const store = new Store(new RecordSource());
  const environment = new Environment({ network, store });
  return environment;
};

export const createAsyncTestingEnv = (timeout: number, resolvers: object) => {
  const executableSchema = makeExecutableSchema({
    typeDefs: serverSchemaTxt,
    resolvers: resolvers,
  });

  const network = Network.create(async (operation, variables) => {
    await new Promise((resolve) => setTimeout(resolve, timeout));
    const resp = await graphql(executableSchema, operation.text, {}, {}, variables);
    console.log({ resp });
    return resp;
  });

  const store = new Store(new RecordSource());
  const environment = new Environment({ network, store });
  return environment;
};

export const loadingForeverEnvironment = () => {
  const network = Network.create(async () => {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  });

  const store = new Store(new RecordSource());
  const environment = new Environment({ network, store });
  return environment;
};

export const returnPayloadEnvironment = (payload: any) => {
  const network = Network.create(() => {
    const resp = { data: payload };
    return resp;
  });
  const store = new Store(new RecordSource());
  const environment = new Environment({ network, store });
  return environment;
};

export const returnAsyncPayloadEnvironment = (
  payloadGenFactory: () => any,
  timeout: number
) => {
  const payloadGen = payloadGenFactory();
  const network = Network.create(async () => {
    await new Promise((resolve) => setTimeout(resolve, timeout || 1000));
    const { value } = payloadGen.next();
    const resp = { data: value };
    return resp;
  });
  const store = new Store(new RecordSource());
  const environment = new Environment({ network, store });
  return environment;
};

export const noNetworkEnvironment = () => {
  const network = Network.create(() => {
    return { data: {} };
  });
  const store = new Store(new RecordSource());
  const environment = new Environment({ network, store });
  return environment;
};
