import { UserSettings_user } from "__relay__/UserSettings_user.graphql";
import { RequireAtLeastOne } from "../helpers/typeUtils";

type UserSettingsType = UserSettings_user["settings"];

type MachineStateIdle = { status: "idle"; srv: UserSettingsType };

type MachineStateMut = {
  status: "mut";
  srv: UserSettingsType;
  mut: RequireAtLeastOne<UserSettingsType>;
};

type MachineStateMut2 = {
  status: "mut2";
  srv: UserSettingsType;
  mut: RequireAtLeastOne<UserSettingsType>;
  mut2: RequireAtLeastOne<UserSettingsType>;
};

type MachineState = {
  remote: MachineStateIdle | MachineStateMut | MachineStateMut2;
  local: RequireAtLeastOne<UserSettingsType> | null;
};

type Event =
  | { type: "edit"; fieldName: keyof UserSettingsType; value: any }
  | { type: "submit" }
  | { type: "cancel" }
  | { type: "mutSucc" }
  | { type: "mutFail" };

function next(state: MachineState, event: Event) {
  switch (state.remote.status) {
    case "idle": {
      state;
      return nextIdle(state.remote, state.local, event);
    }
    case "mut": {
      return nextMut(state, event);
    }
    case "mut2":
      return nextMut2(state, event);
    default:
      // impossible
      throw new Error("impossible state is in fact possible");
  }
}

function nextIdle(
  remote: MachineStateIdle,
  local: RequireAtLeastOne<UserSettingsType> | null,
  event: Event
) {}

function nextMut(state: MachineStateMut, event: Event) {}

function nextMut2(state: MachineStateMut2, event: Event) {}
