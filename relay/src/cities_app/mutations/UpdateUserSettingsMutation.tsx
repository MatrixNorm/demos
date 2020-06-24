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
          citiesPaginationPageSize
          foo
          bar
        }
      }
    }
  }
`;

function commit({
  environment,
  input,
  optimisticResponse,
}: {
  environment: IEnvironment;
  input: UpdateUserSettingsInput;
  optimisticResponse: UserSettings;
}) {
  // XXX need validation?
  return commitMutation(environment, {
    mutation,
    variables: {
      input,
    },
    optimisticResponse,
    onError: (err) => {
      //handle application error
    },
  });
}

export default { commit };

// function buildOptimisticResponse(
//   input: UpdateUserSettingsInput,
//   currentSettings: UserSettings_settings
// ): UpdateUserSettingsMutationResponse {
//   return {
//     updateUserSettings: {
//       user: {
//         id: input.userId,
//         settings: {
//           citiesPaginationPageSize:
//             input.citiesPaginationPageSize || currentSettings.citiesPaginationPageSize,
//           foo: input.foo || currentSettings.foo,
//           bar: input.bar || currentSettings.bar,
//         },
//       },
//     },
//   };
// }
