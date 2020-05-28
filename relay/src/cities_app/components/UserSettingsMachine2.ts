import { UserSettings_user } from "__relay__/UserSettings_user.graphql";
import { RequireAtLeastOne } from "../helpers/typeUtils";
import { User } from "../types.codegen";

type UserSettingsType = UserSettings_user["settings"];

type MutZero = {
  status: "idle";
  srv: UserSettingsType;
};
type MutOne = {
  status: "mut";
  srv: UserSettingsType;
  mut: Partial<UserSettingsType>; // active mutation delta
};
type MutTwo = {
  status: "mut2";
  srv: UserSettingsType;
  mut: Partial<UserSettingsType>;
  mut2: Partial<UserSettingsType>; // queued mutation delta
};

type Edited = Partial<UserSettingsType>;

type StateZeroClean = [MutZero, null];
type StateZeroDirty = [MutZero, Edited];
type StateOneClean = [MutOne, null];
type StateOneDirty = [MutOne, Edited];
type StateTwoClean = [MutTwo, null];
type StateTwoDirty = [MutTwo, Edited];

type State =
  | StateZeroClean
  | StateZeroDirty
  | StateOneClean
  | StateOneDirty
  | StateTwoClean
  | StateTwoDirty;

type Event =
  | EventEdit
  | EventSubmit
  | EventCancel
  | EventMutSucc
  | EventMutFail;

type EventEdit = {
  type: "edit";
  payload: Partial<UserSettingsType>;
};
type EventSubmit = { type: "submit" };
type EventCancel = { type: "cancel" };
type EventMutSucc = { type: "mutSucc"; response: UserSettingsType };
type EventMutFail = { type: "mutFail" };

function transit(state: State, event: Event): State {
  let [mut, edited] = state;
  switch (mut.status) {
    case "idle": {
      if (edited === null) {
        return transitZeroCleanEdit(mut, event);
      }
      return transitZeroDirtyEdit(mut, edited, event);
    }
    case "mut": {
      if (edited === null) {
        return transitZeroCleanEdit(mut, event);
      }
      return transitZeroDirtyEdit(mut, edited, event);
    }
    case "mut2": {
      if (edited === null) {
        return transitZeroCleanEdit(mut, event);
      }
      return transitZeroDirtyEdit(mut, edited, event);
    }
    default:
      // impossible
      throw new Error("impossible state is in fact possible");
  }
}

function transitZeroCleanEdit(
  mut: MutZero,
  event: EventEdit
): StateZeroClean | StateZeroDirty {
  return [mut, null];
}

function transitZeroDirtyEdit(
  state: StateZeroClean,
  event: EventEdit
): StateZeroClean | StateZeroDirty {
  return state;
}
