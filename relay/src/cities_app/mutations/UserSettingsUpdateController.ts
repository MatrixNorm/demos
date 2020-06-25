import { graphql } from "react-relay";
import {
  commitLocalUpdate,
  createOperationDescriptor,
  getRequest,
  IEnvironment,
  ROOT_ID,
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

const fsmStateAtom: FsmState<UserSettings>[] = [{ status: "idle", context: {} }];
export const resetFsmStateAtom = () => {
  fsmStateAtom[0] = { status: "idle", context: {} };
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
  console.log({ fsmStateAtom, sv, ed, event });
  if (sv === null) return;
  const ret = transit(fsmStateAtom[0], event, { sv: sv.settings, ed });
  //console.log({ ret });
  if (ret) {
    const [nextFsmState, effects] = ret;
    fsmStateAtom[0] = nextFsmState;
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
      case "applyUpdate": {
        applyOptimisticUpdate(eff.params, environment);
        break;
      }
      case "revertUpdate": {
        revertOptimisticUpdate(eff.params, environment);
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
      // const xxx = store
      //   .get(ROOT_ID)
      //   ?.getLinkedRecord("uiState")
      // if (xxx) {
      //   xxx.setLinkedRecord({}, 'userSettingsEditDelta')
      // }
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
      handleEvent({ type: "mut-succ", serverValue }, environment);
    },
  });
}

function applyOptimisticUpdate(optUpd: UserSettings, environment: IEnvironment) {}

function revertOptimisticUpdate(optUpd: UserSettings, environment: IEnvironment) {}
