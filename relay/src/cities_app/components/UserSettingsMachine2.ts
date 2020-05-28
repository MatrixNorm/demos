import { UserSettings_user } from "__relay__/UserSettings_user.graphql";
import { RequireAtLeastOne } from "../helpers/typeUtils";
import { User } from "../types.codegen";

type UserSettingsType = UserSettings_user["settings"];

type MutStateZero = {
  status: "idle";
  srv: UserSettingsType;
};
type MutStateOne = {
  status: "mut";
  srv: UserSettingsType;
  mut: RequireAtLeastOne<UserSettingsType>; // active mutation delta
};
type MutStateTwo = {
  status: "mut2";
  srv: UserSettingsType;
  mut: RequireAtLeastOne<UserSettingsType>;
  mut2: RequireAtLeastOne<UserSettingsType>; // queued mutation delta
};

type Clean = null;
type Dirty = RequireAtLeastOne<UserSettingsType>;

type StateZeroClean = [MutStateZero, Clean];
type StateZeroDirty = [MutStateZero, Dirty];
type StateOneClean = [MutStateOne, Clean];
type StateOneDirty = [MutStateOne, Dirty];
type StateTwoClean = [MutStateTwo, Clean];
type StateTwoDirty = [MutStateTwo, Dirty];

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
  payload: RequireAtLeastOne<UserSettingsType>;
};
type EventSubmit = { type: "submit" };
type EventCancel = { type: "cancel" };
type EventMutSucc = { type: "mutSucc"; response: UserSettingsType };
type EventMutFail = { type: "mutFail" };

function transit(state: State, event: Event): State {
  let [mutState, edited] = state;
  switch (mutState.status) {
    case "idle": {
      if (edited === null) {
        return fromZeroClean(mutState, event);
      }
      return fromZeroDirty(mutState, edited, event);
    }
    case "mut": {
      if (edited === null) {
        return fromOneClean(mutState, event);
      }
      return fromOneDirty(mutState, edited, event);
    }
    case "mut2": {
      if (edited === null) {
        return fromTwoClean(mutState, event);
      }
      return fromTwoDirty(mutState, edited, event);
    }
    default:
      // impossible
      throw new Error("impossible state is in fact possible");
  }
}

function fromZeroClean(
  mut: MutStateZero,
  event: Event
): StateZeroClean | StateZeroDirty {
  switch (event.type) {
    case "edit":
      return [mut, { foo: "1" }] as StateZeroDirty;
    default:
      return [mut, null] as StateZeroClean;
  }
}

function fromZeroDirty(
  mutState: MutStateZero,
  edited: Dirty,
  event: Event
): StateZeroClean | StateZeroDirty | StateOneClean {
  switch (event.type) {
    case "edit":
      return [mutState, { foo: "1" }] as StateZeroDirty;
    case "cancel":
      return [mutState, null] as StateZeroClean;
    case "submit":
      return [
        { status: "mut", srv: mutState.srv, mut: edited },
        null,
      ] as StateOneClean;
    default:
      return [mutState, edited] as StateZeroDirty;
  }
}

function fromOneClean(
  mutState: MutStateOne,
  event: Event
): StateZeroClean | StateZeroDirty | StateOneClean | StateOneDirty {
  switch (event.type) {
    case "edit":
      return [mutState, { foo: "1" }] as StateOneDirty;
    case "mutSucc":
      return [{ status: "idle", srv: event.response }, null] as StateZeroClean;
    case "mutFail":
      return [
        { status: "idle", srv: mutState.srv },
        mutState.mut,
      ] as StateZeroDirty;
    default:
      return [mutState, null] as StateOneClean;
  }
}

function fromOneDirty(
  mutState: MutStateOne,
  edited: Dirty,
  event: Event
): State {
  switch (event.type) {
    case "edit":
      return [mutState, { foo: "1" }] as StateOneDirty;
    case "cancel":
      return;
    case "submit":
      return;
    case "mutSucc":
      return [{ status: "idle", srv: event.response }, null] as StateZeroClean;
    default:
      return [mutState, null] as StateOneClean;
  }
}
