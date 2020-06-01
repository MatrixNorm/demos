// Consider FSM in typescript

// Event type
type Evt = EvtFoo | EvtBar;
type EvtFoo = { type: "foo"; payload: unknown };
type EvtBar = { type: "bar"; payload: unknown };

// State type
type State = StateX | StateY;
type StateX = { status: "x"; data: number };
type StateY = { status: "y"; data: string };

function transit(s: StateX, e: EvtFoo): StateY;
function transit(s: StateX, e: EvtBar): StateX;
function transit(s: StateY, e: EvtFoo): StateX;
function transit(s: StateY, e: EvtBar): StateY;
function transit(s: any, e: any) {
  if (s.status === "x") {
    if (e.type === "foo") {
      return { status: "x", data: 7 };
      //return { status: "y", data: "abc" };
    }
    if (e.type === "bar") {
      return { status: "x", data: 7 };
    }
  }
  if (s.status === "y") {
    if (e.type === "foo") {
      return { status: "x", data: 5 };
    }
    if (e.type === "bar") {
      return { status: "y", data: "xyz" };
    }
  }
  return 1;
}
