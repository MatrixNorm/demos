import { Environment, Network, RecordSource, Store, Observable } from "relay-runtime";
// @ts-ignore
import { graphql, graphqlSync } from "graphql";
// @ts-ignore
import { makeExecutableSchema } from "graphql-tools";
// @ts-ignore
import serverSchemaTxt from "raw-loader!./resources/serverSchema.graphql";
import { serverResolvers } from "./resolvers/index";
import { Server } from "./resolvers/server";
import * as db from "./resolvers/database";

function waitFor(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

const serverSchema = makeExecutableSchema({
  typeDefs: serverSchemaTxt,
  resolvers: serverResolvers,
});

export const createRelayEnvironment = (
  { timeout }: { timeout: number } = { timeout: 5000 }
) => {
  const network = Network.create(async (operation, variables) => {
    await waitFor(timeout);
    const resp = await graphql(
      serverSchema,
      operation.text || "",
      {},
      { user: db.users["user#1"] },
      variables
    );
    return resp as any;
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
    resolvers,
  });

  const network = Network.create((operation, variables) => {
    const resp = graphqlSync(executableSchema, operation.text || "", {}, {}, variables);
    return resp as any;
  });

  const store = new Store(new RecordSource());
  const environment = new Environment({ network, store });
  return environment;
};

export const createAsyncTestingEnv = (timeout: number, resolvers: any) => {
  const executableSchema = makeExecutableSchema({
    typeDefs: serverSchemaTxt,
    resolvers,
  });

  const network = Network.create(async (operation, variables) => {
    await await waitFor(timeout);
    const resp = await graphql(executableSchema, operation.text || "", {}, {}, variables);
    return resp as any;
  });

  const store = new Store(new RecordSource());
  const environment = new Environment({ network, store });
  return environment;
};

export const loadingForeverEnvironment = () => {
  const network = Network.create(async () => {
    while (true) {
      await await waitFor(1000);
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

export const returnPayloadAsyncEnvironment = (
  payloadGenFactory: () => any,
  timeout: number
) => {
  const payloadGen = payloadGenFactory();
  const network = Network.create(async () => {
    await waitFor(timeout || 1000);
    const { value } = payloadGen.next();
    if (value && value.constructor === Error) {
      throw value;
    }
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

export const createFakeServerEnvironment = (resolvers: object) => {
  const server = new Server(resolvers);
  const network = Network.create(async (operation, variables) => {
    const resp = await server.request({ operation, variables });
    return resp;
  });
  const store = new Store(new RecordSource());
  const environment = new Environment({ network, store });
  return { environment, server };
};
