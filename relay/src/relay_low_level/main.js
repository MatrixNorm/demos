import { graphql } from "react-relay";
import {
  createOperationDescriptor,
  getRequest,
  __internal
} from "relay-runtime";
import env from "./env";

const query = graphql`
  query mainQuery($pageNo: Int!) {
    cities(pageNo: $pageNo) {
      nodes {
        id
        name
        population
      }
      pageNo
      hasNextPage
    }
  }
`;

const variables = { pageNo: 1 };

//console.log(query());
const request = getRequest(query);
console.log("request", request);
const operation = createOperationDescriptor(request, variables);
console.log("operation", operation);
console.log(env.getStore().getSource()._records);
const reference = env.retain(operation);
console.log("reference", reference);

console.log(env.getStore().getSource()._records);
env.execute({ operation }).subscribe({
  next: () => {
    console.log(env.getStore().getSource()._records);
    console.log(env.lookup(operation.fragment));
  }
});
