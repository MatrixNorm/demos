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

// const query = graphql`
//   query mainQuery($pageNo: Int!) {
//     cities(pageNo: $pageNo) {
//       nodes {
//         id
//         name
//         population
//       }
//       pageNo
//       hasNextPage
//     }
//   }
// `;

const query = graphql`
  query mainQuery {
    __typename
    uiState {
      id
      citySearchParams {
        countryNameContains
        populationGte
      }
    }
  }
`;

const variables = { pageNo: 1 };

async function job() {
  //console.log(query());
  const request = getRequest(query);
  log("request", request);
  const operationDescriptor = createOperationDescriptor(request, {});
  log("operation", operationDescriptor);
  // let data = {
  //   cities: {
  //     nodes: [
  //       {
  //         id: "8101",
  //         name: "Seattle",
  //         population: 3643765.0
  //       }
  //     ],
  //     pageNo: 1,
  //     hasNextPage: true,
  //     hasPrevPage: true
  //   }
  // };
  let data = {
    __typename: "__Root",
    uiState: {
      id: "local:UIState",
      citySearchParams: {
        countryNameContains: "abc",
        populationGte: 2000
      }
    }
  };
  env.commitPayload(operationDescriptor, data);
  env.retain(operationDescriptor.root);
  // const reference = env.retain(operation);
  // log("reference", reference);

  // ps("111");
  // const response = await env.execute({ operation }).toPromise();
  // log(response);
  // ps("222");
  // const snapshot = env.lookup(operation.fragment);
  // log(snapshot);
  // const unsub = env.subscribe(snapshot, x => log(x));

  // commitLocalUpdate(env, store => {
  //   store.get("8521").setValue("Orlandos", "name");
  // });
}

job();
