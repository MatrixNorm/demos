import { commitMutation, graphql } from "react-relay";
import { IEnvironment } from "relay-runtime";

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
}: {
  pageSize: number;
  userId: string;
}) {
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
  pageSize,
  userId
}: {
  environment: IEnvironment;
  pageSize: number;
  userId: string;
}) {
  if (Number.isNaN(pageSize)) {
    return;
  }
  const input = {
    pageSize,
    userId
  };

  return commitMutation(environment, {
    mutation,
    variables: {
      input
    },
    optimisticResponse: getOptimisticResponse({ pageSize, userId })
  });
}

export default { commit };
