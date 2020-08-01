import { trueDelta, Compacted, merge } from "../helpers/object";

export type Event<T extends object> =
  | EvEdit<T>
  | EvSubmit
  | EvClear
  | EvResolve
  | EvReject;

type EvEdit<T extends object> = {
  type: "edit";
  payload: Compacted<T>;
};
type EvSubmit = { type: "submit" };
type EvClear = { type: "clear" };
type EvResolve = { type: "resolve" };
type EvReject = { type: "reject" };

export type State<T extends object> = StateIdle<T> | StateActive<T>;
type StateIdle<T extends object> = { sv: T; od: null; ed: Compacted<T> | null };
type StateActive<T extends object> = { sv: T; od: Compacted<T>; ed: Compacted<T> | null };

export type ReturnType<T extends object> =
  | State<T>
  | [State<T>, { type: "commitMutation"; mutInput: Compacted<T> }];

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
      return {
        ...state,
        ed: trueDelta({ delta: merge(ed, event.payload), basis: sv }),
      };
    }
    case "submit": {
      let mutInput = trueDelta({ delta: ed, basis: sv });
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
        ed: trueDelta({ delta: merge(ed, event.payload), basis: merge(sv, od) }),
      };
    }
    case "submit": {
      let mutInput = trueDelta({ delta: ed, basis: merge(sv, od) });
      if (mutInput) {
        return { ...state, od: merge(od, mutInput), ed: null };
      }
      return { ...state, ed: null };
    }
    case "resolve": {
      let mutInput = trueDelta({ delta: od, basis: sv });
      if (mutInput) {
        return [
          { ...state, od: mutInput },
          { type: "commitMutation", mutInput },
        ];
      }
      return { ...state, od: null };
    }
    case "reject": {
      return { ...state, od: null, ed: merge(od, ed) };
    }
    default:
      return state;
  }
}
