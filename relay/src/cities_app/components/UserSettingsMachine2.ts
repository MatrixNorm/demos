import { UserSettings_user } from "__relay__/UserSettings_user.graphql";
import { RequireAtLeastOne } from "../helpers/typeUtils";
import { User } from "../types.codegen";

type UserSettingsType = UserSettings_user["settings"];

type StateZero = {
  status: "idle";
  srv: UserSettingsType;
};
type StateOne = {
  status: "mut";
  srv: UserSettingsType;
  mut: RequireAtLeastOne<UserSettingsType>; // active mutation delta
};
type StateTwo = {
  status: "mut2";
  srv: UserSettingsType;
  mut: RequireAtLeastOne<UserSettingsType>;
  mut2: RequireAtLeastOne<UserSettingsType>; // queued mutation delta
};

type Clean = null;
type Dirty = RequireAtLeastOne<UserSettingsType>;

type StateZeroClean = [StateZero, Clean];
type StateZeroDirty = [StateZero, Dirty];
type StateOneClean = [StateOne, Clean];
type StateOneDirty = [StateOne, Dirty];
type StateTwoClean = [StateTwo, Clean];
type StateTwoDirty = [StateTwo, Dirty];

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
  mutState: StateZero,
  event: Event
): StateZeroClean | StateZeroDirty {
  switch (event.type) {
    case "edit": {
      const delta = calcRealDelta(mutState.srv, event.payload);
      if (delta) {
        return [mutState, delta] as StateZeroDirty;
      }
      return [mutState, null] as StateZeroClean;
    }
    default:
      return [mutState, null] as StateZeroClean;
  }
}

function fromZeroDirty(mutState: StateZero, edited: Dirty, event: Event) {
  switch (event.type) {
    case "edit": {
      return fromZeroDirtyEdit(mutState, edited, event);
    }
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

function fromZeroDirtyEdit(
  mutState: StateZero,
  edited: Dirty,
  event: EventEdit
) {
  const newEdited = { ...edited, ...event.payload };
  const delta = calcRealDelta(mutState.srv, newEdited);
  if (delta) {
    return [mutState, delta] as StateZeroDirty;
  }
  return [mutState, null] as StateZeroClean;
}

function fromOneClean(mutState: StateOne, event: Event) {
  switch (event.type) {
    case "edit": {
      return fromOneCleanEdit(mutState, event);
    }
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

function fromOneCleanEdit(mutState: StateOne, event: EventEdit) {
  const optimistic = { ...mutState.srv, ...mutState.mut };
  const delta = calcRealDelta(optimistic, event.payload);
  if (delta) {
    return [mutState, delta] as StateOneDirty;
  }
  return [mutState, null] as StateOneClean;
}

function fromOneDirty(mutState: StateOne, edited: Dirty, event: Event) {
  switch (event.type) {
    case "edit":
      return fromOneDirtyEdit(mutState, edited, event);
    case "cancel":
      return [mutState, null] as StateOneClean;
    case "submit":
      return [
        {
          ...mutState,
          status: "mut2",
          mut2: edited,
        },
        null,
      ] as StateTwoClean;
    case "mutSucc":
      return fromOneDirtyMutSucc(edited, event);
    case "mutFail":
      return [
        { status: "idle", srv: mutState.srv },
        mutState.mut,
      ] as StateZeroDirty;
    default:
      return [mutState, edited] as StateOneDirty;
  }
}

function fromOneDirtyEdit(mutState: StateOne, edited: Dirty, event: EventEdit) {
  const newEdited = { ...edited, ...event.payload };
  const optimistic = { ...mutState.srv, ...mutState.mut };
  const delta = calcRealDelta(optimistic, newEdited);
  if (delta) {
    return [mutState, delta] as StateOneDirty;
  }
  return [mutState, null] as StateOneClean;
}

function fromOneDirtyMutSucc(edited: Dirty, event: EventMutSucc) {
  const delta = calcRealDelta(event.response, edited);
  if (delta) {
    return [{ status: "idle", srv: event.response }, delta] as StateZeroDirty;
  }
  return [{ status: "idle", srv: event.response }, null] as StateZeroClean;
}

function calcRealDelta(
  base: UserSettingsType,
  possibleDelta: RequireAtLeastOne<UserSettingsType>
): RequireAtLeastOne<UserSettingsType> | null {
  const differentEntries = Object.entries(possibleDelta).filter(
    //@ts-ignore
    ([k, v]) => base[k] !== v
  );
  if (differentEntries.length > 0) {
    //@ts-ignore
    return Object.fromEntries(differentEntries);
  }
  return null;
}

function writeToDb() {}
