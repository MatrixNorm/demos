import { UserSettings_user } from "__relay__/UserSettings_user.graphql";
import { RequireAtLeastOne } from "../helpers/typeUtils";

type UserSettingsType = UserSettings_user["settings"];
type Delta = RequireAtLeastOne<UserSettingsType>;
type MaybeDelta = Delta | null;

type MutState = MutStateIdle | MutStateInFlight | MutStateSecondQueued;

type Event = EventEdit | EventSubmit | EventCancel | EventMutSucc | EventMutFail;

type MutStateIdle = {
  status: "idle";
  srv: UserSettingsType;
};
type MutStateInFlight = {
  status: "inFlight";
  srv: UserSettingsType;
  inFlight: Delta; // active mutation delta
};
type MutStateSecondQueued = {
  status: "secondQueued";
  srv: UserSettingsType;
  inFlight: Delta;
  queued: Delta; // queued mutation delta
};

type EventEdit = {
  type: "edit";
  payload: Delta;
};
type EventSubmit = { type: "submit" };
type EventCancel = { type: "cancel" };
type EventMutSucc = { type: "mutSucc"; response: UserSettingsType };
type EventMutFail = { type: "mutFail" };

function transit(
  state: MutState,
  event: Event,
  editDelta: MaybeDelta
): [MutState, MaybeDelta] {
  switch (state.status) {
    case "idle": {
      return fromIdle(state, event, editDelta);
    }
    case "inFlight": {
      return fromInFlight(state, event, editDelta);
    }
    case "secondQueued": {
      const trueEditedDelta = calcRealDelta(
        { ...state.srv, ...state.inFlight, ...state.queued },
        editDelta
      );
      return fromSecondQueued(state, event, editDelta);
    }
    default:
      // impossible
      throw new Error("impossible state is in fact possible");
  }
}

function fromIdle(
  mutState: MutStateIdle,
  event: Event,
  editDelta: MaybeDelta
): [MutStateIdle | MutStateInFlight, MaybeDelta] {
  switch (event.type) {
    case "edit": {
      const trueEditDelta = calcRealDelta(mutState.srv, {
        ...editDelta,
        ...event.payload,
      });
      return [mutState, trueEditDelta];
    }
    case "cancel":
      return [mutState, null];
    case "submit": {
      const trueEditDelta = calcRealDelta(mutState.srv, editDelta);
      if (trueEditDelta) {
        return [{ ...mutState, status: "inFlight", inFlight: trueEditDelta }, null];
      }
      return [mutState, null];
    }
    default:
      return [mutState, editDelta];
  }
}

function fromInFlight(
  mutState: MutStateInFlight,
  event: Event,
  editDelta: MaybeDelta
): [MutState, MaybeDelta] {
  const optimistic = { ...mutState.srv, ...mutState.inFlight };
  switch (event.type) {
    case "edit": {
      const trueEditDelta = calcRealDelta(optimistic, {
        ...editDelta,
        ...event.payload,
      });
      return [mutState, trueEditDelta];
    }
    case "cancel":
      return [mutState, null];
    case "submit": {
      const trueEditDelta = calcRealDelta(optimistic, editDelta);
      if (trueEditDelta) {
        return [{ ...mutState, status: "secondQueued", queued: trueEditDelta }, null];
      }
      return [mutState, null];
    }
    case "mutSucc": {
      return [
        { status: "idle", srv: event.response },
        calcRealDelta(event.response, editDelta),
      ];
    }
    case "mutFail": {
      return [
        { status: "idle", srv: mutState.srv },
        calcRealDelta(mutState.srv, mutState.inFlight),
      ];
    }
    default:
      return [mutState, editDelta];
  }
}

function fromSecondQueued(
  mutState: MutStateSecondQueued,
  event: Event,
  editDelta: MaybeDelta
): [MutState, MaybeDelta] {
  const optimistic = { ...mutState.srv, ...mutState.inFlight, ...mutState.queued };
  switch (event.type) {
    case "edit": {
      const trueEditDelta = calcRealDelta(optimistic, {
        ...editDelta,
        ...event.payload,
      });
      return [mutState, trueEditDelta];
    }
    case "cancel":
      return [mutState, null];
    case "submit": {
      const trueEditDelta = calcRealDelta(optimistic, editDelta);
      if (trueEditDelta) {
        return [{ ...mutState, queued: trueEditDelta }, null];
      }
      return [mutState, null];
    }
    case "mutSucc": {
      return [
        { status: "idle", srv: event.response },
        calcRealDelta(event.response, editDelta),
      ];
    }
    case "mutFail": {
      return [
        { status: "idle", srv: mutState.srv },
        calcRealDelta(mutState.srv, mutState.inFlight),
      ];
    }
    default:
      return [mutState, editDelta];
  }
}

function calcRealDelta(base: UserSettingsType, possibleDelta: null): null;
function calcRealDelta(base: UserSettingsType, possibleDelta: Delta): MaybeDelta;
function calcRealDelta(base: UserSettingsType, possibleDelta: MaybeDelta): MaybeDelta;
function calcRealDelta(base: any, possibleDelta: any) {
  if (possibleDelta === null) {
    return null;
  }
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
