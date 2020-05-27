import { UserSettings_user } from "__relay__/UserSettings_user.graphql";

type UserSettingsType = UserSettings_user["settings"];

type MachineStateIdle = {
  status: "idle";
  srv: UserSettingsType; // server state
};

type MachineStateMut = {
  status: "mut";
  srv: UserSettingsType;
  mut: Partial<UserSettingsType>; // active mutation delta
};

type MachineStateMut2 = {
  status: "mut2";
  srv: UserSettingsType;
  mut: Partial<UserSettingsType>;
  mut2: Partial<UserSettingsType>; // queued mutation delta
};

type MachineState = MachineStateIdle | MachineStateMut | MachineStateMut2;

type State = { remote: MachineState; local: Partial<UserSettingsType> | null };

type Event =
  | { type: "edit"; fieldName: keyof UserSettingsType; value: any }
  | { type: "submit" }
  | { type: "cancel" }
  | { type: "mutSucc"; response: UserSettingsType }
  | { type: "mutFail" };

function reducer(
  state: State,
  event: Event
): State | [State | "startMutation"] {
  switch (state.remote.status) {
    case "idle": {
      if (state.local === null) {
        return { ...state, local: idleReducerClean(state.remote, event) };
      }
      return idleReducerDirty(state.remote, state.local, event);
    }
    case "mut": {
      //return mutReducer(state, event);
    }
    case "mut2":
    //return mut2Reducer(state, event);
    default:
      // impossible
      throw new Error("impossible state is in fact possible");
  }
}

function idleReducerClean(
  remote: MachineStateIdle,
  event: Event
): Partial<UserSettingsType> | null {
  if (event.type === "edit") {
    let { fieldName, value } = event;
    if (value !== remote.srv[fieldName]) {
      return { [fieldName]: value };
    }
  }
  return null;
}

function idleReducerDirty(
  remote: MachineStateIdle,
  local: Partial<UserSettingsType>,
  event: Event
):
  | { remote: MachineStateIdle; local: Partial<UserSettingsType> | null }
  | { remote: MachineStateMut; local: null } {
  if (event.type === "edit") {
    let { fieldName, value } = event;
    if (value !== remote.srv[fieldName]) {
      return { remote, local: { [fieldName]: value } };
    }
  }
  return { remote, local: null };
}

// function mutReducer(
//   state: MachineStateMut,
//   event: Event
// ): MachineStateIdle | MachineStateMut | MachineStateMut2 {
//   const optimistic = { ...state.srv, ...state.mut };
//   switch (event.type) {
//     case "edit": {
//       let { fieldName, value } = event;
//       if (value !== optimistic[fieldName]) {
//         return { ...state, loc: { ...state.loc, [fieldName]: value } };
//       }
//       return state;
//     }
//     case "submit": {
//       if (state.loc) {
//         return { ...state, status: "mut2", mut2: state.loc, loc: null };
//       }
//       return state;
//     }
//     case "cancel":
//       return { ...state, loc: null };
//     case "mutSucc": {
//       let response = { event };
//       if (state.loc) {
//         let diff = state.loc;
//         return;
//       }
//       return { srv: serverResponse, mut: null, mut2: null, loc: null };
//     }
//     default:
//       return state;
//   }
// }

// function mut2Reducer(state: MachineStateMut2, event: Event) {}
