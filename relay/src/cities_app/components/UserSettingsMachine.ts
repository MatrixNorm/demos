import { UserSettings_user } from "__relay__/UserSettings_user.graphql";
import { RequireAtLeastOne } from "../helpers/typeUtils";

type UserSettingsType = UserSettings_user["settings"];

type MachineStateNoMut = {
  srv: UserSettingsType; // server state
  mut: null; // active mutation delta
  mut2: null; // queued mutation delta
  loc: RequireAtLeastOne<UserSettingsType>; // local draft delta
};

type MachineStateMut = {
  srv: UserSettingsType;
  mut: RequireAtLeastOne<UserSettingsType>;
  mut2: null;
  loc: RequireAtLeastOne<UserSettingsType>;
};

type MachineStateMut2 = {
  srv: UserSettingsType;
  mut: RequireAtLeastOne<UserSettingsType>;
  mut2: RequireAtLeastOne<UserSettingsType>;
  loc: RequireAtLeastOne<UserSettingsType>;
};

type MachineState = MachineStateNoMut | MachineStateMut | MachineStateMut2;

type Event =
  | { type: "edit"; fieldName: keyof UserSettingsType; value: any }
  | { type: "submit" }
  | { type: "cancel" }
  | { type: "mutSucc" }
  | { type: "mutFail" };

type Command = "startMutation";

function reducer(state: MachineState, event: Event) {
  if (state.mut === null) {
    return noMutReducer(state, event);
  } else if (state.mut2 === null) {
    return mutReducer(state, event);
  } else {
    return mut2Reducer(state, event);
  }
}

function noMutReducer(
  state: MachineStateNoMut,
  event: Event
): MachineStateNoMut | [MachineStateMut, Command] {
  switch (event.type) {
    case "edit": {
      let { fieldName, value } = event;
      if (value !== state.srv[fieldName]) {
        return { ...state, loc: { ...state.loc, [fieldName]: value } };
      }
      return state;
    }
    case "submit": {
      if (state.loc) {
        return [{ ...state, mut: state.loc, loc: null }, "startMutation"];
      }
      return state;
    }
    case "cancel":
      return { ...state, loc: null };
    default:
      return state;
  }
}

function mutReducer(state: MachineStateMut, event: Event) {
  const optimistic = { ...state.srv, ...state.mut };
  switch (event.type) {
    case "edit": {
      let { fieldName, value } = event.payload;
      if (value !== optimistic[fieldName]) {
        state = { ...state, loc: { ...state.loc, fieldName: value } };
      }
      return state;
    }
    case "submit": {
      if (state.loc) {
        return { ...state, mut2: state.loc, loc: null };
      }
      return state;
    }
    case "cancel":
      return { ...state, loc: null };
    case "mutSucc": {
      let serverResponse = event.payload;
      if (state.loc) {
        let diff = state.loc;
        return;
      }
      return { srv: serverResponse, mut: null, mut2: null, loc: null };
    }
    default:
      return state;
  }
}

function mut2Reducer(state: MachineStateMut2, event: Event) {}
