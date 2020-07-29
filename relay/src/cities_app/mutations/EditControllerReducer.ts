import { compact, merge, shallowEqual, trueDelta, Compacted } from "../helpers/object";

type State<T extends object> = StateIdle<T> | StateInFlight<T> | StateHasQueued<T>;

type StateIdle<T extends object> = {
  status: "idle";
  value: T;
  rollback: null;
  editDelta: Compacted<T> | null;
};
type StateInFlight<T extends object> = {
  status: "inFlight";
  value: T;
  rollback: T;
  editDelta: Compacted<T> | null;
};
type StateHasQueued<T extends object> = {
  status: "hasQueued";
  value: T;
  rollback: T;
  editDelta: Compacted<T> | null;
  queued: T;
};

export type Event<T extends object> =
  | EvEdit<T>
  | EvClearEdit
  | EvSubmitMutation
  | EvDoneOkMutation
  | EvDoneErrMutation;

type EvEdit<T extends object> = {
  type: "edit";
  payload: Compacted<T>;
};
type EvClearEdit = { type: "clearEdit" };
type EvSubmitMutation = { type: "submitMutation" };
type EvDoneOkMutation = { type: "doneOkMutation" };
type EvDoneErrMutation = { type: "doneErrMutation" };

export type ReducerReturn<T extends object> =
  | State<T>
  | { state: State<T>; effects: Effect<T>[] }
  | null;

type Effect<T extends object> =
  | { type: "commitMutation"; mutInput: Compacted<T> }
  | { type: "mutationFail" };

function reduce<T extends object>(state: State<T>, event: Event<T>): ReducerReturn<T> {
  switch (state.status) {
    case "idle": {
      return reduceIdle(state, event);
    }
    case "inFlight": {
      return reduceInFlight(state, event);
    }
    case "hasQueued": {
      return null;
    }
  }
}

function reduceIdle<T extends object>(
  state: StateIdle<T>,
  event: Event<T>
): ReducerReturn<T> {
  switch (event.type) {
    case "edit": {
      return {
        ...state,
        editDelta: trueDelta({
          delta: merge(state.editDelta, event.payload),
          basis: state.value,
        }),
      };
    }
    case "submitMutation": {
      const mutInput = trueDelta({ delta: state.editDelta, basis: state.value });
      const optimisticValue = merge(state.value, state.editDelta);
      if (mutInput) {
        return {
          state: {
            status: "inFlight",
            value: optimisticValue,
            rollback: state.value,
            editDelta: null,
          },
          effects: [{ type: "commitMutation", mutInput }],
        };
      }
      return null;
    }
    default:
      return null;
  }
}

function reduceInFlight<T extends object>(
  state: StateInFlight<T>,
  event: Event<T>
): ReducerReturn<T> {
  switch (event.type) {
    case "edit": {
      return {
        ...state,
        editDelta: trueDelta({
          delta: { ...state.editDelta, ...event.payload },
          basis: state.value,
        }),
      };
    }
    case "doneOkMutation": {
      return {
        ...state,
        status: "idle",
        rollback: null,
        editDelta: trueDelta({ delta: state.editDelta, basis: state.value }),
      };
    }
    case "doneErrMutation": {
      return {
        state: {
          status: "idle",
          value: state.rollback,
          rollback: null,
          editDelta: trueDelta({
            delta: { ...state.value, ...state.editDelta },
            basis: state.rollback,
          }),
        },
        effects: [{ type: "mutationFail" }],
      };
    }
    case "submitMutation": {
      const mutInput = trueDelta({ delta: state.editDelta, basis: state.value });
      const optimisticValue = { ...state.value, ...state.editDelta };
      if (mutInput) {
        return {
          ...state,
          status: "hasQueued",
          value: optimisticValue,
          editDelta: null,
          queued: optimisticValue,
        };
      }
      return null;
    }
    default:
      return null;
  }
}

function reduceHasQueued<T extends object>(
  state: StateHasQueued<T>,
  event: Event<T>
): ReducerReturn<T> {
  switch (event.type) {
    case "edit": {
      return {
        ...state,
        editDelta: trueDelta({
          delta: { ...state.editDelta, ...event.payload },
          basis: state.value,
        }),
      };
    }
    case "doneOkMutation": {
      const mutInput = trueDelta({
        delta: compactObject(state.queued),
        basis: state.value,
      });
      if (mutInput) {
        return {
          state: {
            status: "inFlight",
            value: state.queued,
            rollback: state.value,
            editDelta: null,
          },
          effects: [{ type: "commitMutation", mutInput }],
        };
      }
      return {
        ...state,
        status: "idle",
        rollback: null,
        editDelta: trueDelta({ delta: state.editDelta, basis: state.value }),
      };
    }
    case "doneErrMutation": {
      let x = { ...state.queued, ...state.editDelta };
      return {
        state: {
          status: "idle",
          value: state.rollback,
          rollback: null,
          editDelta: trueDelta({
            delta: { ...state.queued, ...state.editDelta },
            basis: state.rollback,
          }),
        },
        effects: [{ type: "mutationFail" }],
      };
    }
    case "submitMutation": {
      const mutInput = trueDelta({ delta: state.editDelta, basis: state.value });
      const optimisticValue = { ...state.value, ...state.editDelta };
      if (mutInput) {
        return {
          ...state,
          status: "hasQueued",
          value: optimisticValue,
          editDelta: null,
        };
      }
      return null;
    }
    default:
      return null;
  }
}
