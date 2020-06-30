import { trueDelta } from "../helpers/object";

type EvEdit<T> = {
  type: "edit";
  payload: Partial<T>;
};
type EvSubmit = { type: "submit" };
type EvClear = { type: "clear" };
type EvResolve = { type: "resolve" };
type EvReject = { type: "reject" };
export type Event<T extends object> =
  | EvEdit<T>
  | EvSubmit
  | EvClear
  | EvResolve
  | EvReject;

type StateIdle<T> = { sv: T; od: null; ed: Partial<T> | null };
type StateActive<T> = { sv: T; od: Partial<T>; ed: Partial<T> | null };
export type State<T extends object> = StateIdle<T> | StateActive<T>;

export type ReturnType<T extends object> =
  | State<T>
  | [State<T>, { type: "commitMutation"; mutInput: Partial<T> }];

export function reduce<T extends object>(
  state: State<T>,
  event: Event<T>
): ReturnType<T> {
  if (state.od === null) {
    return reduceIdle(event, state);
  }
  return reduceActive(event, state);
}

function reduceIdle<T extends object>(
  event: Event<T>,
  state: StateIdle<T>
): ReturnType<T> {
  const { sv, ed } = state;
  switch (event.type) {
    case "clear": {
      return { ...state, ed: null };
    }
    case "edit": {
      return { ...state, ed: trueDelta({ ...ed, ...event.payload }, sv) };
    }
    case "submit": {
      let mutInput = trueDelta(ed, sv);
      if (mutInput) {
        return [
          { ...state, od: mutInput, ed: null },
          { type: "commitMutation", mutInput },
        ];
      }
      return { ...state, ed: null };
    }
    default:
      return state;
  }
}

function reduceActive<T extends object>(
  event: Event<T>,
  state: StateActive<T>
): ReturnType<T> {
  const { sv, ed, od } = state;
  switch (event.type) {
    case "clear": {
      return { ...state, ed: null };
    }
    case "edit": {
      return {
        ...state,
        ed: trueDelta({ ...ed, ...event.payload }, { ...sv, ...od }),
      };
    }
    case "submit": {
      let mutInput = trueDelta(ed, { ...sv, ...od });
      if (mutInput) {
        return { ...state, od: mutInput, ed: null };
      }
      return { ...state, ed: null };
    }
    case "resolve": {
      let mutInput = trueDelta(od, sv);
      if (mutInput) {
        return [
          { ...state, od: mutInput },
          { type: "commitMutation", mutInput },
        ];
      }
      return { ...state, od: null };
    }
    case "reject": {
      console.log({ od, ed });
      return { ...state, od: null, ed: { ...od, ...ed } };
    }
    default:
      return state;
  }
}
