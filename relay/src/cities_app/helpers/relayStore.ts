import {
  createOperationDescriptor,
  getRequest,
  IEnvironment,
  GraphQLTaggedNode,
} from "relay-runtime";

export function retainRecord(query: GraphQLTaggedNode, environment: IEnvironment) {
  const request = getRequest(query);
  const operationDescriptor = createOperationDescriptor(request, {});
  environment.retain(operationDescriptor);
}
