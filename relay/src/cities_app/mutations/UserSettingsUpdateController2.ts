import { graphql } from "react-relay";
import {
  commitLocalUpdate,
  createOperationDescriptor,
  getRequest,
  ROOT_ID,
  IEnvironment,
} from "relay-runtime";
import { reduce, Event as EventType, State as StateType } from "./EditControllerReducer";
import UpdateUserSettingsMutation from "./UpdateUserSettingsMutation";
import { UserSettings_settings } from "__relay__/UserSettings_settings.graphql";
import { NukeFragRef } from "../helpers/typeUtils";

type UserSettings = NukeFragRef<UserSettings_settings>;

function queryState(
  environment: IEnvironment
): {
  userId: string | null;
  sv: UserSettings | null;
  ed: Partial<UserSettings> | null;
  od: Partial<UserSettings> | null;
} {
  const query = graphql`
    query UserSettingsUpdateController2Query {
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
  // @ts-ignore
  let ed = response.data?.uiState?.userSettingsEditDelta || null;
  if (ed) {
    ed = Object.fromEntries(Object.entries(ed).filter(([_, v]) => v));
    if (ed.length === 0) {
      ed = null;
    }
  }
  // @ts-ignore
  let od = response.data?.uiState?.userSettingsOptimisticDelta || null;
  if (od) {
    od = Object.fromEntries(Object.entries(ed).filter(([_, v]) => v));
    if (od.length === 0) {
      od = null;
    }
  }
  return {
    // @ts-ignore
    userId: response.data?.viewer?.id || null,
    // @ts-ignore
    sv: response.data?.viewer?.settings || null,
    ed,
    od,
  };
}

export function handleEvent(event: EventType<UserSettings>, environment: IEnvironment) {
  let { userId, sv, ed, od } = queryState(environment);
  //console.log({ userId, sv, ed, od, event });
  if (sv === null || userId === null) return;
  let ret = reduce({ sv, ed, od }, event);
  //console.log({ ret });
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
  editDelta: Partial<UserSettings> | null,
  environment: IEnvironment
) {
  if (!editDelta) {
    commitLocalUpdate(environment, (store) => {
      store.delete(`${ROOT_ID}:uiState:userSettingsEditDelta`);
    });
    return;
  }

  // commitLocalUpdate(environment, (store) => {
  //   let uiState = store.get(ROOT_ID)?.getOrCreateLinkedRecord("uiState", "UIState");
  //   if (uiState) {
  //     const record = store.create(
  //       notificationId,
  //       "UINotification"
  //     );
  //     newNotificationRecord.setValue(notificationId, "id");
  //     newNotificationRecord.setValue(notification.kind, "kind");
  //     newNotificationRecord.setValue(notification.text, "text");
  //   }
  // });

  const query = graphql`
    query UserSettingsUpdateController2WriteEditDeltaQuery {
      __typename
      uiState {
        userSettingsEditDelta {
          ...UserSettings_editDelta
        }
      }
    }
  `;
  const request = getRequest(query);
  const operationDescriptor = createOperationDescriptor(request, {});
  let data = {
    __typename: "__Root",
    uiState: {
      userSettingsEditDelta: editDelta,
    },
  };
  //console.log({ editDelta, data });
  environment.commitPayload(operationDescriptor, data);
  environment.retain(operationDescriptor);
}

function writeOptimisticDelta(
  optimisticDelta: Partial<UserSettings> | null,
  environment: IEnvironment
) {
  if (!optimisticDelta) {
    commitLocalUpdate(environment, (store) => {
      store.delete(`${ROOT_ID}:uiState:userSettingsOptimisticDelta`);
    });
    return;
  }

  const query = graphql`
    query UserSettingsUpdateController2WriteOptimisticDeltaQuery {
      __typename
      uiState {
        userSettingsOptimisticDelta {
          ...UserSettings_optimisticDelta
        }
      }
    }
  `;
  const request = getRequest(query);
  const operationDescriptor = createOperationDescriptor(request, {});
  let data = {
    __typename: "__Root",
    uiState: {
      userSettingsOptimisticDelta: optimisticDelta,
    },
  };
  //console.log({ editDelta, data });
  environment.commitPayload(operationDescriptor, data);
  environment.retain(operationDescriptor);
}

function commitMutation(
  environment: IEnvironment,
  userId: string,
  mutInput: Partial<UserSettings>
) {
  UpdateUserSettingsMutation.commit({
    environment,
    input: { ...mutInput, userId },
    onFail: () => {
      handleEvent({ type: "completed" }, environment);
    },
    onSucc: () => {
      handleEvent({ type: "completed" }, environment);
    },
  });
}
