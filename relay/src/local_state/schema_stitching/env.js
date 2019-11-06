import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { graphql, parse, visit, print } from "graphql";
import { makeExecutableSchema } from "graphql-tools";

import serverSchemaTxt from "raw-loader!./data/serverSchema.graphql";
import clientSchemaTxt from "raw-loader!./data/clientSchema.graphql";

import { serverResolvers, clientResolvers } from "./resolvers";
import { isQueryNotEmpty } from "../../utils/graphql";

const serverSchema = makeExecutableSchema({
  typeDefs: serverSchemaTxt,
  resolvers: serverResolvers
});
const clientSchema = makeExecutableSchema({
  typeDefs: clientSchemaTxt,
  resolvers: clientResolvers
});

const network = Network.create(async (operation, variables) => {
  console.log(operation.text, variables);

  const queryAST = parse(operation.text);

  const clientQueryAST = visit(queryAST, {
    enter(node, key, parent) {
      if (
        node.kind === "SelectionSet" &&
        parent.kind === "OperationDefinition"
      ) {
        const nodeCopy = JSON.parse(JSON.stringify(node));

        nodeCopy.selections = nodeCopy.selections.filter(selection => {
          return selection.name.value === "localSettings";
        });
        return nodeCopy;
      }
    }
  });
  const serverQueryAST = visit(queryAST, {
    enter(node, key, parent) {
      if (
        node.kind === "SelectionSet" &&
        parent.kind === "OperationDefinition"
      ) {
        const nodeCopy = JSON.parse(JSON.stringify(node));

        nodeCopy.selections = nodeCopy.selections.filter(selection => {
          return selection.name.value !== "localSettings";
        });
        return nodeCopy;
      }
    }
  });

  console.log(clientQueryAST);
  console.log(serverQueryAST);

  let serverResp = {};
  let clientResp = {};

  if (isQueryNotEmpty(serverQueryAST)) {
    console.log(1111111)
    await new Promise(resolve => setTimeout(resolve, 100));
    serverResp = await graphql(
      serverSchema,
      print(serverQueryAST),
      {},
      undefined,
      variables
    );
  }

  if (isQueryNotEmpty(clientQueryAST)) {
    console.log(2222222)
    clientResp = await graphql(
      clientSchema,
      print(clientQueryAST),
      {},
      undefined,
      variables
    );
  }

  console.log(serverResp);
  console.log(clientResp);

  return {data: {...serverResp.data, ...clientResp.data}};
});

const store = new Store(new RecordSource());
const environment = new Environment({ network, store });

window.relayEnv = environment;
export default environment;
