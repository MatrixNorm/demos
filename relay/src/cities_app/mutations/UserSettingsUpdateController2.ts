import { graphql } from "react-relay";
import {
  commitLocalUpdate,
  createOperationDescriptor,
  getRequest,
  ROOT_ID,
  IEnvironment,
} from "relay-runtime";
import { transit, Event as EventType, State as FsmStateType } from "./EditFsm2";
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
    query UserSettingsUpdateControllerEditDeltaQuery {
      viewer {
        id
        settings {
          ...UserSettings_settings @relay(mask: false)
        }
      }
      uiState {
        userSettingsEditDelta {
          ...UserSettings_settings @relay(mask: false)
        }
        userSettingsOptimisticDelta {
          ...UserSettings_settings @relay(mask: false)
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

  let ret;
  if (od === null) {
    ret = transit({ type: "idle", context: { sv, ed, od } }, event);
  } else {
    ret = transit({ type: "active", context: { sv, ed, od } }, event);
  }
  //console.log({ ret });
  if (ret) {
    const [nextFsmState, effects] = ret;
    controllerStateAtom.fsmState = nextFsmState;
    processEffects(sv.userId, effects, environment);
  }
}

function processEffects(
  userId: string,
  effects: EffectType<UserSettings>[],
  environment: IEnvironment
) {
  for (let eff of effects) {
    switch (eff.type) {
      case "db/ed": {
        writeEditDeltaToDb(eff.params, environment);
        break;
      }
      case "commitMutation": {
        commitMutation(userId, eff.params, environment);
        break;
      }
      case "applyOptUpd2": {
        applyOptUpd2(eff.params, environment);
        break;
      }
      case "revertOptUpd2": {
        revertOptUpd2();
        break;
      }
    }
  }
}

function writeEditDeltaToDb(
  editDelta: Partial<UserSettings> | null,
  environment: IEnvironment
) {
  if (!editDelta) {
    commitLocalUpdate(environment, (store) => {
      store.delete(`${ROOT_ID}:uiState:userSettingsEditDelta`);
    });
    return;
  }

  const query = graphql`
    query UserSettingsUpdateControllerEditDelta2Query {
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

function commitMutation(
  userId: string,
  { optUpd, mutInput }: { optUpd: UserSettings; mutInput: Partial<UserSettings> },
  environment: IEnvironment
) {
  UpdateUserSettingsMutation.commit({
    environment,
    input: { ...mutInput, userId },
    optimisticResponse: {
      updateUserSettings: {
        user: {
          id: userId,
          settings: optUpd,
        },
      },
    },
    onFail: () => {
      handleEvent({ type: "mut-fail" }, environment);
    },
    onSucc: (serverValue: UserSettings) => {
      console.log(serverValue);
      handleEvent({ type: "mut-succ", serverValue }, environment);
    },
  });
}

function applyOptUpd2(optUpd: UserSettings, environment: IEnvironment) {
  console.log({ optUpd });
  const { dispose } = environment.applyUpdate({
    storeUpdater: (store) => {
      const settingsRecord = store
        .get(ROOT_ID)
        ?.getLinkedRecord("viewer")
        ?.getLinkedRecord("settings");
      if (settingsRecord) {
        for (let [attr, value] of Object.entries(optUpd)) {
          settingsRecord.setValue(value, attr);
        }
      }
    },
  });
  controllerStateAtom.disposeOptUpd2 = dispose;
}

function revertOptUpd2() {
  controllerStateAtom.disposeOptUpd2();
}
