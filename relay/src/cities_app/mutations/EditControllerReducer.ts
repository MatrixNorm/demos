import { trueDelta, Compacted } from "../helpers/object";

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
type EvDoneErrMutation = { type: "doneErr<utation" };

export type ReducerReturn<T extends object> =
  | State<T>
  | { state: State<T>; effects: Effect<T>[] };

type Effect<T extends object> =
  | { type: "commitMutation"; mutInput: Compacted<T> }
  | { type: "pushNotification"; message: String };

function reduce<T extends object>(state: State<T>, event: Event<T>) {
  switch (state.status) {
    case "idle": {
      return;
    }
    case "inFlight": {
      return;
    }
    case "hasQueued": {
      return;
    }
  }
}

function reduceIdle<T extends object>(
  state: StateIdle<T>,
  event: Event<T>
): ReducerReturn<T> | null {
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
    case "submitMutation": {
      const mutInput = trueDelta({ delta: state.editDelta, basis: state.value });
      const optimisticValue = { ...state.value, ...state.editDelta };
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
  state: StateIdle<T>,
  event: Event<T>
): ReducerReturn<T> | null {}
