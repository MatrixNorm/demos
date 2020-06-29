import { commitMutation, graphql } from "react-relay";
import { IEnvironment } from "relay-runtime";
import {
  UpdateUserSettingsInput,
  UpdateUserSettingsMutationResponse,
} from "__relay__/UpdateUserSettingsMutation.graphql";
import { UserSettings_settings } from "__relay__/UserSettings_settings.graphql";
import { NukeFragRef } from "../helpers/typeUtils";

type UserSettings = NukeFragRef<UserSettings_settings>;

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
  optimisticResponse?: UpdateUserSettingsMutationResponse;
  onFail: any;
  onSucc: any;
}) {
  let config: any = {
    mutation,
    variables: {
      input,
    },
    onCompleted: (response: any, errors: any) => {
      if (errors || response.updateUserSettings === null) {
        onFail();
      } else {
        onSucc();
      }
    },
    onError: (err: any) => {
      // app error
      onFail();
    },
  };
  if (optimisticResponse) {
    config["optimisticResponse"] = optimisticResponse;
  }
  return commitMutation(environment, config);
}

export default { commit };
