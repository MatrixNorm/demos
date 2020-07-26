import { trueDelta, Compacted } from "../helpers/object";

type State<T extends object> =
  | {
      status: "idle";
      value: T;
      rollback: null;
      editDelta: Compacted<T>;
    }
  | { status: "inFlight"; value: T; rollback: T; editDelta: Compacted<T> }
  | { status: "hasQueued"; value: T; rollback: T; editDelta: Compacted<T> };

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

export type ReturnType<T extends object> =
  | State<T>
  | [State<T>, { type: "commitMutation"; mutInput: Compacted<T> }];
