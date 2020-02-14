import { commitMutation, graphql } from "react-relay";
import { IEnvironment } from "relay-runtime";
import {
  ChangeCitiesPaginationPageSizeInput,
  ChangeCitiesPaginationPageSizeMutationResponse
} from "__relay__/ChangeCitiesPaginationPageSizeMutation.graphql";

const mutation = graphql`
  mutation ChangeCitiesPaginationPageSizeMutation(
    $input: ChangeCitiesPaginationPageSizeInput!
  ) {
    changeCitiesPaginationPageSize(input: $input) {
      user {
        id
        settings {
          citiesPaginationPageSize
        }
      }
    }
  }
`;

function getOptimisticResponse({
  pageSize,
  userId
}: ChangeCitiesPaginationPageSizeInput): ChangeCitiesPaginationPageSizeMutationResponse {
  return {
    changeCitiesPaginationPageSize: {
      user: {
        id: userId,
        settings: {
          citiesPaginationPageSize: pageSize
        }
      }
    }
  };
}

function commit({
  environment,
  input
}: {
  environment: IEnvironment;
  input: ChangeCitiesPaginationPageSizeInput;
}) {
  if (Number.isNaN(input.pageSize)) {
    return;
  }
  return commitMutation(environment, {
    mutation,
    variables: {
      input
    },
    optimisticResponse: getOptimisticResponse(input)
  });
}

export default { commit };
