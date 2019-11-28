export class FSM {
  constructor(createStateToInputHandlerMap, initialState) {
    this._subscribers = [];

    this.stateToInputHandlerMap = createStateToInputHandlerMap(
      (nextState, output) => {
        this.current.state = nextState;
        this.current.inputHandler = this.stateToInputHandlerMap[nextState]();
        for (let sub of this._subscribers) {
          sub.onOutput(output);
        }
      }
    );

    this.current = {
      state: initialState,
      inputHandler: this.stateToInputHandlerMap[initialState]()
    };
  }
  send(input) {
    this.current.inputHandler(input);
  }
  subscribe(subscriber) {
    this._subscribers.push(subscriber);
  }
}

export function createDebounceStateMachine(timeout) {
  const inputHandlersFactory = function(transit) {
    return {
      BUSY: function() {
        let timeoutId = setTimeout(() => {
          transit("IDLE", "RELEASED");
        }, timeout);

        return () => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            transit("IDLE", "RELEASED");
          }, timeout);
        };
      },
      IDLE: function() {
        return () => {
          transit("BUSY");
        };
      }
    };
  };
  return new FSM(inputHandlersFactory, "IDLE");
}

export function debounce(fn, timeout) {
  const fsm = createDebounceStateMachine(timeout);
  let _paramsBox= [];
  fsm.subscribe({
    onOutput: output => {
      if (output === "RELEASED") {
        fn(_paramsBox[0]);
      }
    }
  });
  return params => {
    _paramsBox[0] = params
    fsm.send();
  };
}
