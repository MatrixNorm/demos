class FSM {
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
  send() {
    this.current.inputHandler();
  }
  subscribe(subscriber) {
    this._subscribers.push(subscriber);
  }
}

export default FSM;
