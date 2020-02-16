import { commitMutation, graphql } from "react-relay";
import { IEnvironment } from "relay-runtime";
import {
  UpdateUserSettingsInput,
  UpdateUserSettingsMutationResponse
} from "__relay__/UpdateUserSettingsMutation.graphql";

const mutation = graphql`
  mutation UpdateUserSettingsMutation($input: UpdateUserSettingsInput!) {
    updateUserSettings(input: $input) {
      userId
      citiesPaginationPageSize
      foo
      bar
    }
  }
`;

function getOptimisticResponse(
  input: UpdateUserSettingsInput
): UpdateUserSettingsMutationResponse {
  return {
    updateUserSettings: {
      userId: input.userId,
      citiesPaginationPageSize: input.citiesPaginationPageSize || null,
      foo: input.foo || null,
      bar: input.bar || null
    }
  };
}

function commit({
  environment,
  input
}: {
  environment: IEnvironment;
  input: UpdateUserSettingsInput;
}) {
  // XXX need validation?
  return commitMutation(environment, {
    mutation,
    variables: {
      input
    },
    optimisticResponse: getOptimisticResponse(input)
  });
}

export default { commit };
