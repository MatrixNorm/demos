import { graphql } from "react-relay";
import {
  createOperationDescriptor,
  getRequest,
  commitLocalUpdate
} from "relay-runtime";
import env from "./env";

const log = console.log;

function ps(x) {
  console.log(x, env.getStore().getSource()._records);
}

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

async function job() {
  //console.log(query());
  const request = getRequest(query);
  log("request", request);
  const operation = createOperationDescriptor(request, variables);
  log("operation", operation);
  const reference = env.retain(operation);
  log("reference", reference);
  // env.execute({ operation }).subscribe({
  //   next: response => {
  //     console.log(response);
  //     ps("222");
  //     console.log(env.lookup(operation.fragment));
  //   }
  // });
  ps("111");
  const response = await env.execute({ operation }).toPromise();
  log(response);
  ps("222");
  const snapshot = env.lookup(operation.fragment);
  log(snapshot);
  const unsub = env.subscribe(snapshot, x => log(x));

  commitLocalUpdate(env, store => {
    store.get("8521").setValue("Orlandos", "name");
  });
}

job();
