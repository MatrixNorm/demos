import { UserSettings_user } from "__relay__/UserSettings_user.graphql";
import { RequireAtLeastOne } from "../helpers/typeUtils";

type UserSettingsType = UserSettings_user["settings"];
type Delta = RequireAtLeastOne<UserSettingsType>;

type State = StateIdle | StateInFlight | StateSecondQueued;

type Event =
  | EventEdit
  | EventSubmit
  | EventCancel
  | EventMutSucc
  | EventMutFail;

type StateIdle = {
  status: "idle";
  srv: UserSettingsType;
};
type StateInFlight = {
  status: "inFlight";
  srv: UserSettingsType;
  inFlight: Delta; // active mutation delta
};
type StateSecondQueued = {
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

function transit(state: State, event: Event, editedDelta: Delta): State {
  switch (state.status) {
    case "idle": {
      const trueEditedDelta = calcRealDelta(state.srv, editedDelta);
      return fromIdle(state, event);
    }
    case "inFlight": {
      const trueEditedDelta = calcRealDelta(
        { ...state.srv, ...state.inFlight },
        editedDelta
      );
      return fromInFlight(state, event);
    }
    case "secondQueued": {
      const trueEditedDelta = calcRealDelta(
        { ...state.srv, ...state.inFlight, ...state.queued },
        editedDelta
      );
      return fromSecondQueued(state, event);
    }
    default:
      // impossible
      throw new Error("impossible state is in fact possible");
  }
}

function fromIdle(state: StateIdle, event: Event) {
  switch (event.type) {
    case "edit": {
      return state;
    }
    case "cancel":
      return state;
    case "submit":
      return state;
    default:
      return state;
  }
}

function calcRealDelta(base: UserSettingsType, possibleDelta: null): null;
function calcRealDelta(
  base: UserSettingsType,
  possibleDelta: Delta
): Delta | null;
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
