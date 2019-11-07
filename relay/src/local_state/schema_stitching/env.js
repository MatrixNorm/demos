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
  //console.log(queryAST);

  const clientQueryFragments = [];

  let clientQueryAST = visit(queryAST, {
    enter(node, key, parent) {
      if (
        node.kind === "SelectionSet" &&
        parent.kind === "OperationDefinition" &&
        parent.operation === "query"
      ) {
        const nodeCopy = JSON.parse(JSON.stringify(node));
        const clientSelections = nodeCopy.selections.filter(selection => {
          return selection.name.value === "localSettings";
        });
        if (clientSelections.length === 0) {
          return null;
        }

        visit(clientSelections, {
          enter(node) {
            if (node.kind === "FragmentSpread") {
              clientQueryFragments.push(node.name.value);
            }
          }
        });

        nodeCopy.selections = clientSelections;
        return nodeCopy;
      }
    }
  });
  // remove non-local fragments from client query
  visit(clientQueryAST, {
    enter(node) {
      if (node.kind === "FragmentSpread") {
        return null;
      }
    }
  });

  //console.log(77777777, clientQueryFragments);

  const serverQueryAST = visit(queryAST, {
    enter(node, key, parent) {
      if (
        node.kind === "SelectionSet" &&
        parent.kind === "OperationDefinition"
      ) {
        const nodeCopy = JSON.parse(JSON.stringify(node));
        const serverSelections = nodeCopy.selections.filter(selection => {
          return selection.name.value !== "localSettings";
        });
        if (serverSelections.length === 0) {
          return null;
        }
        nodeCopy.selections = serverSelections;
        return nodeCopy;
      }
      if (
        node.kind === "FragmentDefinition" &&
        clientQueryFragments.includes(node.name.value)
      ) {
        return null;
      }
    }
  });

  console.log("============");
  console.log(clientQueryAST);
  console.log(print(clientQueryAST));
  console.log(serverQueryAST);
  console.log(print(serverQueryAST));
  console.log("############");

  let serverResp = {};
  let clientResp = {};

  if (isQueryNotEmpty(serverQueryAST)) {
    console.log(1111111);
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
    console.log(2222222);
    clientResp = await graphql(
      clientSchema,
      print(clientQueryAST),
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
