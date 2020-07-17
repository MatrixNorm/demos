import {
  commitLocalUpdate,
  createOperationDescriptor,
  getRequest,
  IEnvironment,
  GraphQLTaggedNode,
} from "relay-runtime";

export function retainRecord(query: GraphQLTaggedNode, environment: IEnvironment) {
  console.log(query);
  const request = getRequest(query);
  const operationDescriptor = createOperationDescriptor(request, {});
  environment.retain(operationDescriptor);
}

// function writeRecord(
//   query: GraphQLTaggedNode,
//   path: string,
//   editDelta: UserSettingsDelta,
//   environment: IEnvironment
// ) {
//   commitLocalUpdate(environment, (store) => {
//     store.delete(`${ROOT_ID}:${path}`);
//   });
//   if (editDelta) {
//     commitLocalUpdate(environment, (store) => {
//       const delta = store
//         .get(ROOT_ID)
//         ?.getOrCreateLinkedRecord("uiState", "UIState")
//         ?.getOrCreateLinkedRecord("userSettingsEditDelta", "UIUserSettingsDelta");
//       if (delta) {
//         for (let key in editDelta) {
//           delta.setValue(editDelta[key as keyof UserSettingsDelta], key);
//         }
//       }
//     });
//     retainRecord(query, environment);
//   }
// }
