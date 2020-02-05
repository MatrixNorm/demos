import { commitMutation, graphql } from "react-relay";

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

function getOptimisticResponse(pageSize, userId) {
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

function commit(environment, pageSize, userId) {
  const input = {
    pageSize,
    userId
  };

  return commitMutation(environment, {
    mutation,
    variables: {
      input
    },
    optimisticResponse: getOptimisticResponse(pageSize, userId)
  });
}

export default { commit };
