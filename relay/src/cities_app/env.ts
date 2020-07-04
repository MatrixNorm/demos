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
  { timeout }: { timeout: number } = { timeout: 5000 }
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
    resolvers,
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
    resolvers,
  });

  const network = Network.create(async (operation, variables) => {
    console.log(operation);
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

export const XXX = (server: { request: any }) => {
  const network = Network.create(async (operation, variables) => {
    console.log(operation);
    const resp = await server.request({ operation, variables });
    console.log({ resp });
    return resp;
  });

  const store = new Store(new RecordSource());
  const environment = new Environment({ network, store });
  return environment;
};

export class Server {
  constructor(resolvers: any) {
    this._isInitial = true;
    this._requests = [];
    this._observer = null;
    this.executableSchema = makeExecutableSchema({
      typeDefs: serverSchemaTxt,
      resolvers,
    });
  }

  getRequests() {
    return this._requests;
  }

  subscribe(observer: any) {
    this._observer = observer;
  }

  request({ operation, variables }) {
    if (this._isInitial) {
      this._isInitial = false;
      return graphqlSync(this.executableSchema, operation.text, {}, {}, variables);
    }
    return new Promise((resolve, reject) => {
      let arrayIndex = this._requests.length;

      function resolveRequest() {
        console.log(this);
        this._requests.splice(arrayIndex, 1);
        this._observer && this._observer(this._requests);
        let response = graphqlSync(
          this.executableSchema,
          operation.text,
          {},
          {},
          variables
        );
        resolve(response);
      }

      function rejectRequest() {
        this._requests.splice(arrayIndex, 1);
        this._observer && this._observer(this._requests);
        reject("sheisse");
      }
      this._requests.push({
        data: { operation, variables },
        resolveRequest: resolveRequest.bind(this),
        rejectRequest: rejectRequest.bind(this),
      });
      this._observer && this._observer(this._requests);
      console.log(this._requests);
    });
  }
}
