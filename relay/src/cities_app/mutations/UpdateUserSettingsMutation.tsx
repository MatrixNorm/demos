import { commitMutation, graphql } from "react-relay";
import { IEnvironment } from "relay-runtime";
import {
  UpdateUserSettingsInput,
  UpdateUserSettingsMutationResponse,
} from "__relay__/UpdateUserSettingsMutation.graphql";
import { UserSettings_settings } from "__relay__/UserSettings_settings.graphql";
import { NukeFragRef } from "../helpers/typeUtils";

type UserSettings = NukeFragRef<UserSettings_settings>;

// XXX ...UserSettings_settings fragment and generated types with fragment refs
const mutation = graphql`
  mutation UpdateUserSettingsMutation($input: UpdateUserSettingsInput!) {
    updateUserSettings(input: $input) {
      user {
        id
        settings {
          ...UserSettings_settings @relay(mask: false)
        }
      }
    }
  }
`;

function commit({
  environment,
  input,
  optimisticResponse,
  onFail,
  onSucc,
}: {
  environment: IEnvironment;
  input: UpdateUserSettingsInput;
  optimisticResponse: UpdateUserSettingsMutationResponse;
  onFail: any;
  onSucc: any;
}) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input,
    },
    optimisticResponse,
    onCompleted: (response, errors) => {
      if (errors || response.updateUserSettings === null) {
        onFail();
      } else {
        onSucc(response.updateUserSettings.user.settings);
      }
    },
    onError: (err) => {
      // app error
      onFail();
    },
  });
}

export default { commit };
