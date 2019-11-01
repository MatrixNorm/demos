import {
  Environment,
  Network,
  RecordSource,
  Store,
  commitLocalUpdate
} from "relay-runtime";

import { graphql, parse, visit } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import typeDefs from "raw-loader!./schema.graphql";
import resolvers from "./resolvers";

const schema = makeExecutableSchema({ typeDefs, resolvers });
const store = new Store(new RecordSource());

function isArtifactOfLocalQuery(ast) {
  if (ast.definitions.length !== 1) return false;
  let selectionSet = ast.definitions[0].selectionSet;
  if (selectionSet.selections.length !== 1) return false;
  let field = selectionSet.selections[0];
  return field.name.value === "__typename";
}

const network = Network.create(async (operation, variables) => {
  console.log(operation.text, variables);
  if (isArtifactOfLocalQuery(parse(operation.text))) {
    return { data: { __typename: "Query" } };
  }
  await new Promise(resolve => setTimeout(resolve, 100));
  const resp = await graphql(schema, operation.text, {}, undefined, variables);
  console.log(resp);
  return resp;
});

const environment = new Environment({ network, store });

commitLocalUpdate(environment, store => {
  const fieldKey = "localSettings";
  const __typename = "LocalSettings";

  const dataID = `client:${__typename}`;
  const record = store.create(dataID, __typename);

  record.setValue("Europe", "selectedContinent");
  record.setValue(["Europe", "NorthAmerica"], "allContinents");

  environment.retain({
    dataID,
    variables: {},
    node: { selections: [] }
  });
  console.log(store.getRoot());
  store.getRoot().setLinkedRecord(record, fieldKey);
});

window.relayEnv = environment;
export default environment;
