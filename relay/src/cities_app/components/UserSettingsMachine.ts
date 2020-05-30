import { UserSettings_user } from "__relay__/UserSettings_user.graphql";
import { RequireAtLeastOne } from "../helpers/typeUtils";

type UserSettingsType = UserSettings_user["settings"];

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
  inFlight: RequireAtLeastOne<UserSettingsType>; // active mutation delta
};
type StateSecondQueued = {
  status: "secondQueued";
  srv: UserSettingsType;
  inFlight: RequireAtLeastOne<UserSettingsType>;
  queued: RequireAtLeastOne<UserSettingsType>; // queued mutation delta
};

type EventEdit = {
  type: "edit";
  payload: RequireAtLeastOne<UserSettingsType>;
};
type EventSubmit = { type: "submit" };
type EventCancel = { type: "cancel" };
type EventMutSucc = { type: "mutSucc"; response: UserSettingsType };
type EventMutFail = { type: "mutFail" };

function transit(state: State, event: Event): State {
  switch (state.status) {
    case "idle": {
      return fromIdle(state, event);
    }
    case "inFlight": {
      return fromInFlight(state, event);
    }
    case "secondQueued": {
      return fromSecondQueued(state, event);
    }
    default:
      // impossible
      throw new Error("impossible state is in fact possible");
  }
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
