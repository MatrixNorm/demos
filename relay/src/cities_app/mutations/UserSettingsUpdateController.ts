import { graphql } from "react-relay";
import { createOperationDescriptor, getRequest, IEnvironment } from "relay-runtime";
import { transit, Event as EventType, State as FsmState } from "./EditFsm";
import { UserSettings_user } from "__relay__/UserSettings_user.graphql";

type UserSettings = UserSettings_user["settings"];

const fsmStateAtom: FsmState<UserSettings>[] = [{ status: "idle", context: {} }];

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
  return response?.data?.uiState?.userSettingsEditDelta | null;
}

function queryServerValue(environment: IEnvironment): UserSettings | null {
  const query = graphql`
    query UserSettingsUpdateControllerServerValueQuery {
      viewer {
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
  // @ts-ignore
  return response?.data?.viewer?.settings | null;
}

export function handleEvent(event: EventType<UserSettings>, environment: IEnvironment) {
  let sv = queryServerValue(environment);
  let ed = queryEditDelta(environment);
  if (sv === null) return;
  const ret = transit(fsmStateAtom[0], event, { sv, ed });
  if (ret) {
    const [nextFsmState, effects] = ret;
    fsmStateAtom[0] = nextFsmState;
    processEffects(effects);
  }
}

function processEffects(effects: any) {
  for (let eff of effects) {
    if ("db/ed" in eff) {
      writeEditDeltaToDb(eff["db/ed"]);
      continue;
    }
    if ("commitMutation" in eff) {
      commitOptimisticMutation(eff["commitMutation"]);
      continue;
    }
    if ("applyUpdate" in eff) {
      applyOptimisticUpdate(eff["applyUpdate"]);
      continue;
    }
    if ("revertUpdate" in eff) {
      revertOptimisticUpdate(eff["revertUpdate"]);
      continue;
    }
  }
}

function writeEditDeltaToDb(editDelta: Partial<UserSettings>) {}
function commitOptimisticMutation(optUpd: UserSettings) {}
function applyOptimisticUpdate(optUpd: UserSettings) {}
function revertOptimisticUpdate(optUpd: UserSettings) {}
