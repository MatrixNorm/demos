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

type Clean = null;
type Dirty = RequireAtLeastOne<UserSettingsType>;

type StateZeroClean = [MutZero, Clean];
type StateZeroDirty = [MutZero, Dirty];
type StateOneClean = [MutOne, Clean];
type StateOneDirty = [MutOne, Dirty];
type StateTwoClean = [MutTwo, Clean];
type StateTwoDirty = [MutTwo, Dirty];

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
        transitZeroClean(mut, event);
      }
      transitZeroDirty(mut, edited, event);
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

function transitZeroClean(
  mut: MutZero,
  event: Event
): StateZeroClean | StateZeroDirty {
  switch (event.type) {
    case "edit":
      return [mut, { foo: "1" }] as StateZeroDirty;
    default:
      return [mut, null] as StateZeroClean;
  }
}

function transitZeroDirty(
  mut: MutZero,
  edited: Dirty,
  event: Event
): StateZeroClean | StateZeroDirty {
  switch (event.type) {
    case "edit":
      return [mut, { foo: "1" }] as StateZeroDirty;
    case "submit":
      return transitZeroDirtySubmit(mut, edited, event);
    default:
      return [mut, edited] as StateZeroDirty;
  }
}

function transitZeroDirtyCancel(
  state: StateZeroDirty,
  edited: Dirty,
  event: EventCancel
): StateZeroClean {
  return state;
}

function transitZeroDirtySubmit(
  state: StateZeroDirty,
  edited: Dirty,
  event: EventSubmit
): StateZeroClean | StateZeroDirty {
  return state;
}
