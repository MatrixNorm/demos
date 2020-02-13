import {
  commitLocalUpdate,
  Environment,
  Network,
  RecordSource,
  Store
} from "relay-runtime";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import serverSchemaTxt from "raw-loader!theapp/resources/serverSchema.graphql";
import { serverResolvers } from "theapp/mock/resolvers";

const serverSchema = makeExecutableSchema({
  typeDefs: serverSchemaTxt,
  resolvers: serverResolvers
});

const network = Network.create(async (operation, variables) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const resp = await graphql(
    serverSchema,
    operation.text,
    {},
    undefined,
    variables
  );
  console.log(resp);
  return resp;
});

const store = new Store(new RecordSource());
const environment = new Environment({ network, store });

commitLocalUpdate(environment, store => {
  const uiStateId = "client:UIState";
  const uiState = store.create(uiStateId, "UIState");

  const citySearchParams = store.create(
    "client:UICitySearchParams",
    "UICitySearchParams"
  );
  //citySearchParams.setValue("France", "country");
  uiState.setLinkedRecord(citySearchParams, "citySearchParams");

  environment.retain({
    uiStateId,
    variables: {},
    node: { selections: [] }
  });
  store.getRoot().setLinkedRecord(uiState, "uiState");
});

window.relayEnv = environment;
export default environment;
