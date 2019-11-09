import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { graphql, parse, print } from "graphql";
import { makeExecutableSchema } from "graphql-tools";

import serverResolvers from "../posts_server/server";
import { clientResolvers } from "./clientResolvers";
import {
  isOperationNotEmpty,
  cutClientPart,
  cutRemotePart
} from "../../utils/graphql";

import serverSchemaTxt from "raw-loader!../posts_server/schema.graphql";
import clientSchemaTxt from "raw-loader!./data/clientSchema.graphql";

const serverSchema = makeExecutableSchema({
  typeDefs: serverSchemaTxt,
  resolvers: serverResolvers
});
const clientSchema = makeExecutableSchema({
  typeDefs: clientSchemaTxt,
  resolvers: clientResolvers
});

const network = Network.create(async (operation, variables) => {
  //console.log(operation.text, variables);
  const operationAST = parse(operation.text);
  //console.log(operationAST);

  const { clientAST, clientFragments } = cutClientPart(operationAST);
  const serverAST = cutRemotePart(operationAST, clientFragments);

  console.log("============");
  console.log(clientAST);
  console.log("client: ", print(clientAST));
  console.log(serverAST);
  console.log("server: ", print(serverAST));
  console.log("############");

  let serverResp = {};
  let clientResp = {};

  if (isOperationNotEmpty(serverAST)) {
    console.log("Server query is not empty");
    await new Promise(resolve => setTimeout(resolve, 100));
    serverResp = await graphql(
      serverSchema,
      print(serverAST),
      {},
      undefined,
      variables
    );
  }

  if (isOperationNotEmpty(clientAST)) {
    console.log("Client query is not empty");
    clientResp = await graphql(
      clientSchema,
      print(clientAST),
      {},
      undefined,
      variables
    );
  }

  const resp = { data: { ...serverResp.data, ...clientResp.data } };
  console.log(serverResp);
  console.log(clientResp);
  console.log(resp);
  return resp;
});

const store = new Store(new RecordSource());
const environment = new Environment({ network, store });

window.relayEnv = environment;
export default environment;
