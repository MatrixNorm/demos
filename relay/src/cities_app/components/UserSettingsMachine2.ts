import { UserSettings_user } from "__relay__/UserSettings_user.graphql";
import { RequireAtLeastOne } from "../helpers/typeUtils";

type UserSettingsType = UserSettings_user["settings"];

type MachineStateNoMut =
  | ["noMut", "clean", { srv: UserSettingsType }]
  | [
      "noMut",
      "dirty",
      { srv: UserSettingsType; loc: RequireAtLeastOne<UserSettingsType> }
    ];

type MachineStateMut =
  | [
      "mut",
      "clean",
      { srv: UserSettingsType; mut: RequireAtLeastOne<UserSettingsType> }
    ]
  | [
      "mut",
      "dirty",
      {
        srv: UserSettingsType;
        mut: RequireAtLeastOne<UserSettingsType>;
        loc: RequireAtLeastOne<UserSettingsType>;
      }
    ];

type MachineStateMut2 =
  | [
      "mut2",
      "clean",
      {
        srv: UserSettingsType;
        mut: RequireAtLeastOne<UserSettingsType>;
        mut2: RequireAtLeastOne<UserSettingsType>;
      }
    ]
  | [
      "mut2",
      "dirty",
      {
        srv: UserSettingsType;
        mut: RequireAtLeastOne<UserSettingsType>;
        mut2: RequireAtLeastOne<UserSettingsType>;
        loc: RequireAtLeastOne<UserSettingsType>;
      }
    ];

type MachineState = MachineStateNoMut | MachineStateMut | MachineStateMut2;

type Event =
  | { type: "edit"; fieldName: keyof UserSettingsType; value: any }
  | { type: "submit" }
  | { type: "cancel" }
  | { type: "mutSucc" }
  | { type: "mutFail" };

function next(state: MachineState, event: Event) {
  const mutState = state[0];
  switch (mutState) {
    case "noMut": {
      return nextNoMut(state, event);
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

function nextNoMut(state: MachineStateNoMut, event: Event) {}

function nextMut(state: MachineStateMut, event: Event) {}

function nextMut2(state: MachineStateMut2, event: Event) {}
