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
    od = Object.fromEntries(Object.entries(od).filter(([_, v]) => v));
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
  console.log(JSON.stringify(ret));
  if (Array.isArray(ret)) {
    const [nextState, effect] = ret;
    writeEditDelta(nextState.ed, nextState.sv, environment);
    writeOptimisticDelta(nextState.od, nextState.sv, environment);
    commitMutation(environment, userId, effect.mutInput);
  } else {
    writeEditDelta(ret.ed, ret.sv, environment);
    writeOptimisticDelta(ret.od, ret.sv, environment);
  }
}

function writeEditDelta(
  editDelta: Partial<UserSettings> | null,
  settings: Readonly<UserSettings>,
  environment: IEnvironment
) {
  if (!editDelta) {
    commitLocalUpdate(environment, (store) => {
      store.delete(`${ROOT_ID}:uiState:userSettingsEditDelta`);
    });
    return;
  }
  commitLocalUpdate(environment, (store) => {
    const delta = store
      .get(ROOT_ID)
      ?.getOrCreateLinkedRecord("uiState", "UIState")
      ?.getOrCreateLinkedRecord("userSettingsEditDelta", "UIUserSettingsDelta");
    if (delta) {
      for (let key of Object.keys(settings) as (keyof UserSettings)[]) {
        delta.setValue(editDelta[key], key);
      }
    }
  });
  retainRecord(
    graphql`
      query UserSettingsUpdateController2RetainEditDeltaQuery {
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

function writeOptimisticDelta(
  optimisticDelta: Partial<UserSettings> | null,
  settings: Readonly<UserSettings>,
  environment: IEnvironment
) {
  if (!optimisticDelta) {
    commitLocalUpdate(environment, (store) => {
      store.delete(`${ROOT_ID}:uiState:userSettingsOptimisticDelta`);
    });
    return;
  }
  commitLocalUpdate(environment, (store) => {
    const delta = store
      .get(ROOT_ID)
      ?.getOrCreateLinkedRecord("uiState", "UIState")
      ?.getOrCreateLinkedRecord("userSettingsOptimisticDelta", "UIUserSettingsDelta");
    if (delta) {
      for (let key of Object.keys(settings) as (keyof UserSettings)[]) {
        delta.setValue(optimisticDelta[key], key);
      }
    }
  });
  retainRecord(
    graphql`
      query UserSettingsUpdateController2RetainOptimisticDeltaQuery {
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

function commitMutation(
  environment: IEnvironment,
  userId: string,
  mutInput: Partial<UserSettings>
) {
  console.log({ mutInput });
  UpdateUserSettingsMutation.commit({
    environment,
    input: { ...mutInput, userId },
    onFail: () => {
      handleEvent({ type: "reject" }, environment);
    },
    onSucc: () => {
      handleEvent({ type: "resolve" }, environment);
    },
  });
}
