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
      TYPING: function() {
        let timeoutId = setTimeout(() => {
          transit("IDLE", "USER_STOPPED_TYPING");
        }, timeout);

        return () => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            transit("IDLE", "USER_STOPPED_TYPING");
          }, timeout);
        };
      },
      IDLE: function() {
        return () => {
          transit("TYPING", "USER_STARTED_TYPING");
        };
      }
    };
  };
  return new FSM(inputHandlersFactory, "IDLE");
}

export function debounce(fn, timeout) {
  const fsm = createDebounceStateMachine(timeout);
  fsm.subscribe({
    onOutput: output => {
      if (output === "USER_STOPPED_TYPING") {
        fn();
      }
    }
  });
  return params => {
    fsm.send(params);
  };
}
