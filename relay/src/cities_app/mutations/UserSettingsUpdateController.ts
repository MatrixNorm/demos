import { graphql } from "react-relay";
import {
  commitLocalUpdate,
  createOperationDescriptor,
  getRequest,
  ROOT_ID,
  IEnvironment,
} from "relay-runtime";
import { reduce, Event as EventType } from "./EditControllerReducer";
import UpdateUserSettingsMutation from "./UpdateUserSettingsMutation";
import { retainRecord } from "../helpers/relayStore";
import { compact, Compacted, purgeNulls } from "../helpers/object";
import { UserSettings_settings } from "__relay__/UserSettings_settings.graphql";
import { UserSettingsUpdateControllerQueryResponse } from "__relay__/UserSettingsUpdateControllerQuery.graphql";
import { NukeFragRef } from "../helpers/typeUtils";
import UserSettings from "../components/UserSettings";

type UserSettings = NukeFragRef<UserSettings_settings>;

function lookupState(
  environment: IEnvironment
): {
  userId: string | null;
  sv: UserSettings | null;
  ed: Compacted<UserSettings>;
  od: Compacted<UserSettings>;
} {
  const query = graphql`
    query UserSettingsUpdateControllerQuery {
      viewer {
        id
        settings {
          ...UserSettings_settings @relay(mask: false)
        }
      }
      uiState {
        userSettingsEditDelta {
          ...UserSettings_editDelta @relay(mask: false)
        }
        userSettingsOptimisticDelta {
          ...UserSettings_optimisticDelta @relay(mask: false)
        }
      }
    }
  `;
  const operation = createOperationDescriptor(getRequest(query), {});
  const response = environment.lookup(operation.fragment);
  const data = response.data as UserSettingsUpdateControllerQueryResponse;
  let x = compact(data?.uiState?.userSettingsEditDelta || null);
  return {
    userId: data?.viewer?.id || null,
    sv: data?.viewer?.settings || null,
    ed: purgeNulls(compact(data?.uiState?.userSettingsEditDelta || null)),
    od: purgeNulls(compact(data?.uiState?.userSettingsOptimisticDelta || null)),
  };
}

export function handleEvent(event: EventType<UserSettings>, environment: IEnvironment) {
  let { userId, sv, ed, od } = lookupState(environment);
  //console.log({ userId, sv, ed, od, event });
  if (sv === null || userId === null) return;
  let ret = reduce({ sv, ed, od }, event);
  //console.log(JSON.stringify(ret));
  if (Array.isArray(ret)) {
    const [nextState, effect] = ret;
    writeEditDelta(nextState.ed, environment);
    writeOptimisticDelta(nextState.od, environment);
    commitMutation(environment, userId, effect.mutInput);
  } else {
    writeEditDelta(ret.ed, environment);
    writeOptimisticDelta(ret.od, environment);
  }
}

function writeEditDelta(
  editDelta: Compacted<UserSettings> | null,
  environment: IEnvironment
) {
  commitLocalUpdate(environment, (store) => {
    store.delete(`${ROOT_ID}:uiState:userSettingsEditDelta`);
  });
  if (editDelta) {
    commitLocalUpdate(environment, (store) => {
      const delta = store
        .get(ROOT_ID)
        ?.getOrCreateLinkedRecord("uiState", "UIState")
        ?.getOrCreateLinkedRecord("userSettingsEditDelta", "UIUserSettingsDelta");
      if (delta) {
        for (let key in editDelta) {
          delta.setValue(editDelta[key as keyof UserSettings], key);
        }
      }
    });
    retainRecord(
      graphql`
        query UserSettingsUpdateControllerRetainEditDeltaQuery {
          __typename
          uiState {
            userSettingsEditDelta {
              ...UserSettings_editDelta
            }
          }
        }
      `,
      environment
    );
  }
}

function writeOptimisticDelta(
  optimisticDelta: Compacted<UserSettings> | null,
  environment: IEnvironment
) {
  commitLocalUpdate(environment, (store) => {
    store.delete(`${ROOT_ID}:uiState:userSettingsOptimisticDelta`);
  });
  if (optimisticDelta) {
    commitLocalUpdate(environment, (store) => {
      const delta = store
        .get(ROOT_ID)
        ?.getOrCreateLinkedRecord("uiState", "UIState")
        ?.getOrCreateLinkedRecord("userSettingsOptimisticDelta", "UIUserSettingsDelta");
      if (delta) {
        for (let key in optimisticDelta) {
          delta.setValue(optimisticDelta[key as keyof UserSettings], key);
        }
      }
    });
    retainRecord(
      graphql`
        query UserSettingsUpdateControllerRetainOptimisticDeltaQuery {
          __typename
          uiState {
            userSettingsOptimisticDelta {
              ...UserSettings_optimisticDelta
            }
          }
        }
      `,
      environment
    );
  }
}

function commitMutation(
  environment: IEnvironment,
  userId: string,
  mutInput: Compacted<UserSettings>
) {
  UpdateUserSettingsMutation.commit({
    environment,
    input: { ...(mutInput as UserSettings), userId },
    onFail: () => {
      handleEvent({ type: "reject" }, environment);
    },
    onSucc: () => {
      handleEvent({ type: "resolve" }, environment);
    },
  });
}
