import {
  Environment,
  Network,
  RecordSource,
  Store,
  commitLocalUpdate
} from "relay-runtime";

import { graphql, parse, visit, print } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import typeDefs from "raw-loader!./data/schema.graphql";
import resolvers from "./resolvers";

const schema = makeExecutableSchema({ typeDefs, resolvers });
const store = new Store(new RecordSource());

const network = Network.create(async (operation, variables) => {
  console.log(operation.text, variables);

  const queryAST = parse(operation.text);

  const clientAST = visit(queryAST, {
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
        // console.log(nodeCopy.selections.filter(selection => {
        //   return selection.name.value !== "localSettings"
        // }));
      }
    }
  });
  const serverAST = visit(queryAST, {
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

  console.log(print(clientAST))
  console.log(print(serverAST))

  await new Promise(resolve => setTimeout(resolve, 100));
  const resp = await graphql(schema, operation.text, {}, undefined, variables);
  console.log(resp);
  return resp;
});

const environment = new Environment({ network, store });

window.relayEnv = environment;
export default environment;
