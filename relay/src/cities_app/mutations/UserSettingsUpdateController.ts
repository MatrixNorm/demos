import { graphql } from "react-relay";
import { createOperationDescriptor, getRequest, IEnvironment } from "relay-runtime";
import { transit, Event as EventType, State as FsmState } from "./EditFsm";
import { UserSettings_settings } from "__relay__/UserSettings_settings.graphql";
import { NukeFragRef } from "../helpers/typeUtils";

type UserSettings = NukeFragRef<UserSettings_settings>;

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
  return response?.data?.uiState?.userSettingsEditDelta || null;
}

function queryServerValue(environment: IEnvironment): UserSettings_settings | null {
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
  return response?.data?.viewer?.settings || null;
}

export function handleEvent(
  event: EventType<UserSettings_settings>,
  environment: IEnvironment
) {
  let sv = queryServerValue(environment);
  let ed = queryEditDelta(environment);
  console.log({ sv, ed, event });
  if (sv === null) return;
  const ret = transit(fsmStateAtom[0], event, { sv, ed });
  console.log({ ret });
  if (ret) {
    const [nextFsmState, effects] = ret;
    fsmStateAtom[0] = nextFsmState;
    processEffects(effects, environment);
  }
}

function processEffects(effects: any, environment: IEnvironment) {
  for (let eff of effects) {
    switch (eff.type) {
      case "db/ed": {
        writeEditDeltaToDb(eff.params, environment);
        break;
      }
      case "commitMutation": {
        commitOptimisticMutation(eff.params, environment);
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

function writeEditDeltaToDb(editDelta: Partial<UserSettings>, environment: IEnvironment) {
  console.log(editDelta);
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
  environment.commitPayload(operationDescriptor, data);
  environment.retain(operationDescriptor);
}
function commitOptimisticMutation(optUpd: UserSettings, environment: IEnvironment) {
  console.log(optUpd);
}
function applyOptimisticUpdate(optUpd: UserSettings, environment: IEnvironment) {}
function revertOptimisticUpdate(optUpd: UserSettings, environment: IEnvironment) {}
