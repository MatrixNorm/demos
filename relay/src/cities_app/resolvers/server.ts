// @ts-ignore
import { graphqlSync } from "graphql";
// @ts-ignore
import { makeExecutableSchema } from "graphql-tools";
// @ts-ignore
import serverSchemaTxt from "raw-loader!../resources/serverSchema.graphql";
import { RequestParameters, Variables } from "relay-runtime";

class Deferred {
  promise: any;
  resolve: any;
  reject: any;

  constructor() {
    let self = this;
    this.promise = new Promise(function(resolve, reject) {
      self.resolve = resolve;
      self.reject = reject;
    });
  }
}

export type Request = {
  id: number;
  data: { operation: RequestParameters; variables: Variables };
  deferred: Deferred;
};

type State = {
  requests: Request[];
  controlled: boolean;
};

export class Server {
  state: State;
  observer: any;
  executableSchema: any;
  reqIdCounter: number;

  constructor(resolvers: object) {
    this.state = {
      requests: [],
      controlled: false,
    };
    this.observer = null;
    this.executableSchema = makeExecutableSchema({
      typeDefs: serverSchemaTxt,
      resolvers,
    });
    this.reqIdCounter = 0;
  }

  setState(nextState: State) {
    this.state = nextState;
    this.observer && this.observer(this.state);
  }

  getState() {
    return this.state;
  }

  subscribe(observer: (state: State) => any) {
    this.observer = observer;
  }

  request({
    operation,
    variables,
  }: {
    operation: RequestParameters;
    variables: Variables;
  }) {
    const { controlled, requests } = { ...this.state };
    if (!controlled) {
      return graphqlSync(this.executableSchema, operation.text, {}, {}, variables);
    }
    const deferred = new Deferred();
    let reqId = this.reqIdCounter;
    this.reqIdCounter++;
    requests.push({
      id: reqId,
      data: { operation, variables },
      deferred,
    });
    this.setState({ ...this.state, requests });
    return deferred.promise;
  }

  resolveRequest(reqId: number) {
    const { requests } = { ...this.state };
    const j = requests.findIndex((req) => req.id === reqId);
    if (j >= 0) {
      const req = requests[j];
      let response = graphqlSync(
        this.executableSchema,
        req.data.operation.text,
        {},
        {},
        req.data.variables
      );
      requests.splice(j, 1);
      this.setState({ ...this.state, requests });
      req.deferred.resolve(response);
    }
  }

  rejectRequest(reqId: number) {
    const { requests } = { ...this.state };
    const j = requests.findIndex((req) => req.id === reqId);
    if (j >= 0) {
      const req = requests[j];
      requests.splice(j, 1);
      this.setState({ ...this.state, requests });
      req.deferred.resolve("sheisse");
    }
  }

  setControlled(flag: boolean) {
    this.setState({ ...this.state, controlled: flag });
  }
}
