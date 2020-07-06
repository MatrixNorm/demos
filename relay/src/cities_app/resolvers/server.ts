// @ts-ignore
import { graphqlSync } from "graphql";
// @ts-ignore
import { makeExecutableSchema } from "graphql-tools";
// @ts-ignore
import serverSchemaTxt from "raw-loader!../resources/serverSchema.graphql";
import { RequestParameters, Variables } from "relay-runtime";

type Request = {
  id: number;
  data: { operation: RequestParameters; variables: Variables };
  resolveRequest: () => void;
  rejectRequest: () => void;
};

export class Server {
  isInitial: Boolean;
  requests: Request[];
  observer: any;
  executableSchema: any;
  reqIdCounter: number;

  constructor(resolvers: object) {
    this.isInitial = true;
    this.requests = [];
    this.observer = null;
    this.executableSchema = makeExecutableSchema({
      typeDefs: serverSchemaTxt,
      resolvers,
    });
    this.reqIdCounter = 0;
  }

  getRequests() {
    return this.requests;
  }

  subscribe(observer: any) {
    this.observer = observer;
  }

  request({
    operation,
    variables,
  }: {
    operation: RequestParameters;
    variables: Variables;
  }) {
    // if (this.isInitial) {
    //   this.isInitial = false;
    //   return graphqlSync(this.executableSchema, operation.text, {}, {}, variables);
    // }
    return new Promise((resolve, reject) => {
      let reqId = this.reqIdCounter;
      this.reqIdCounter++;

      const resolveRequest = () => {
        const reqIndex = this.requests.findIndex((req) => req.id === reqId);
        if (reqIndex >= 0) {
          const req = this.requests[reqIndex];
          this.requests.splice(reqIndex, 1);
          this.observer && this.observer(this.requests);
          let response = graphqlSync(
            this.executableSchema,
            req.data.operation.text,
            {},
            {},
            req.data.variables
          );
          resolve(response);
        }
      };

      const rejectRequest = () => {
        const reqIndex = this.requests.findIndex((req) => req.id === reqId);
        if (reqIndex >= 0) {
          this.requests.splice(reqIndex, 1);
          this.observer && this.observer(this.requests);
          reject("sheisse");
        }
      };
      this.requests.push({
        id: reqId,
        data: { operation, variables },
        resolveRequest,
        rejectRequest,
      });
      this.observer && this.observer(this.requests);
    });
  }
}
