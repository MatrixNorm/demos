import { commitMutation, graphql } from "react-relay";
import { IEnvironment } from "relay-runtime";
import {
  UpdateUserSettingsInput,
  UpdateUserSettingsMutationResponse,
} from "__relay__/UpdateUserSettingsMutation.graphql";
import { UserSettings_user } from "__relay__/UserSettings_user.graphql";

type UserSettings = UserSettings_user["settings"];

const mutation = graphql`
  mutation UpdateUserSettingsMutation($input: UpdateUserSettingsInput!) {
    updateUserSettings(input: $input) {
      user {
        id
        settings {
          citiesPaginationPageSize
          foo
          bar
        }
      }
    }
  }
`;

function buildOptimisticResponse(
  input: UpdateUserSettingsInput,
  currentSettings: UserSettings
): UpdateUserSettingsMutationResponse {
  return {
    updateUserSettings: {
      user: {
        id: input.userId,
        settings: {
          citiesPaginationPageSize:
            input.citiesPaginationPageSize ||
            currentSettings.citiesPaginationPageSize,
          foo: input.foo || currentSettings.foo,
          bar: input.bar || currentSettings.bar,
        },
      },
    },
  };
}

function commit({
  environment,
  input,
  currentSettings,
}: {
  environment: IEnvironment;
  input: UpdateUserSettingsInput;
  currentSettings: UserSettings;
}) {
  // XXX need validation?
  return commitMutation(environment, {
    mutation,
    variables: {
      input,
    },
    optimisticResponse: buildOptimisticResponse(input, currentSettings),
    onError: (err) => {
      //handle application error
    },
  });
}

export default { commit };
