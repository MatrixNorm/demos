import { graphql } from "react-relay";
import {
  commitLocalUpdate,
  createOperationDescriptor,
  getRequest,
  ROOT_ID,
  IEnvironment,
} from "relay-runtime";
import {
  transit,
  Event as EventType,
  State as FsmState,
  Effect as EffectType,
} from "./EditFsm";
import UpdateUserSettingsMutation from "./UpdateUserSettingsMutation";
import { UserSettings_settings } from "__relay__/UserSettings_settings.graphql";
import { NukeFragRef } from "../helpers/typeUtils";

type UserSettings = NukeFragRef<UserSettings_settings>;
type ControllerState = { fsmState: FsmState<UserSettings>; disposeOptUpd2: any };

const controllerStateAtom: ControllerState = {
  fsmState: { status: "idle", context: {} },
  disposeOptUpd2: null,
};
export const resetControllerStateAtom = () => {
  controllerStateAtom.fsmState = { status: "idle", context: {} };
  controllerStateAtom.disposeOptUpd2 = null;
};

function queryEditDelta(environment: IEnvironment): Partial<UserSettings> | null {
  const query = graphql`
    query UserSettingsUpdateControllerEditDeltaQuery {
      __typename
      uiState {
        userSettingsEditDelta {
          citiesPaginationPageSize
          foo
          bar
        }
      }
    }
  `;
  const operation = createOperationDescriptor(getRequest(query), {});
  const response = environment.lookup(operation.fragment);
  // @ts-ignore
  const delta = response?.data?.uiState?.userSettingsEditDelta;
  if (delta) {
    return Object.fromEntries(Object.entries(delta).filter(([_, v]) => v));
  }
  return null;
}

function queryServerValue(
  environment: IEnvironment
): { userId: string; settings: UserSettings_settings } | null {
  const query = graphql`
    query UserSettingsUpdateControllerServerValueQuery {
      viewer {
        id
        settings {
          citiesPaginationPageSize
          foo
          bar
        }
      }
    }
  `;
  const operation = createOperationDescriptor(getRequest(query), {});
  const response = environment.lookup(operation.fragment);
  const user = response?.data?.viewer;
  if (user) {
    // @ts-ignore
    return { userId: user.id, settings: user.settings };
  }
  return null;
}

export function handleEvent(event: EventType<UserSettings>, environment: IEnvironment) {
  let sv = queryServerValue(environment);
  let ed = queryEditDelta(environment);
  //console.log({ controllerStateAtom, sv, ed, event });
  if (sv === null) return;
  const ret = transit(controllerStateAtom.fsmState, event, { sv: sv.settings, ed });
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
