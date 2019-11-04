import {
  Environment,
  Network,
  RecordSource,
  Store,
  commitLocalUpdate
} from "relay-runtime";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import resolvers from "../posts_server/server";
import typeDefs from "raw-loader!../posts_server/schema.graphql";

const schema = makeExecutableSchema({ typeDefs, resolvers });
const store = new Store(new RecordSource());

const network = Network.create(async (operation, variables) => {
  console.log(operation.text, variables);
  await new Promise(resolve => setTimeout(resolve, 500));
  const resp = await graphql(schema, operation.text, {}, undefined, variables);
  console.log(resp);
  return resp;
});

const environment = new Environment({ network, store });

commitLocalUpdate(environment, store => {
  

  const postOrderingRecords = [
    store
      .create("client:PostOrdering:0:createdAt", "PostOrdering")
      .setValue("createdAt", "field")
      .setValue(true, "desc")
      .setValue("AAA", "fieldDescription_ASC")
      .setValue("BBB", "fieldDescription_DESC"),
    store
      .create("client:PostOrdering:0:viewsCount", "PostOrdering")
      .setValue("viewsCount", "field")
      .setValue(true, "desc")
      .setValue("xxx", "fieldDescription_ASC")
      .setValue("yyy", "fieldDescription_DESC"),
    store
      .create("client:PostOrdering:1:createdAt", "PostOrdering")
      .setValue("createdAt", "field")
      .setValue(true, "desc")
      .setValue("AAA", "fieldDescription_ASC")
      .setValue("BBB", "fieldDescription_DESC"),
    store
      .create("client:PostOrdering:1:viewsCount", "PostOrdering")
      .setValue("viewsCount", "field")
      .setValue(true, "desc")
      .setValue("xxx", "fieldDescription_ASC")
      .setValue("yyy", "fieldDescription_DESC")
  ];
  console.log(2222222222222);
  // const postListingStateRecords = [
  //   store
  //     .create("client:PostListingState:0", "PostListingState")
  //     .setValue("createdAt", "activeField")
  //     .setLinkedRecords(
  //       [postOrderingRecords[0], postOrderingRecords[1]],
  //       "allOrderings"
  //     ),
  //   store
  //     .create("client:PostListingState:1", "PostListingState")
  //     .setValue("viewsCount", "activeField")
  //     .setValue(
  //       [postOrderingRecords[2], postOrderingRecords[3]],
  //       "allOrderings"
  //     )
  // ];

  // const localStateRecord = store.create("client:localState", "LocalState");
  // localStateRecord.setLinkedRecord(
  //   postListingStateRecords[0],
  //   "postListingState",
  //   { id: "0" }
  // );
  // localStateRecord.setLinkedRecord(
  //   postListingStateRecords[1],
  //   "postListingState",
  //   { id: "1" }
  // );
  // store.getRoot().setLinkedRecord(localStateRecord, "localState");

  // environment.retain({
  //   dataID: "client:localState",
  //   variables: {},
  //   node: { selections: [] }
  // });
  // //console.log(store.getRoot());
});

window.relayEnv = environment;
export default environment;
