import React, { useRef } from "react";

const inputHandlersFactory = function(transit) {
  return {
    TYPING: function() {
      let timeoutId = setTimeout(() => {
        transit("IDLE", "USER_STOPPED_TYPING");
      }, 500);

      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          transit("IDLE", "USER_STOPPED_TYPING");
        }, 500);
      };
    },
    IDLE: function() {
      return () => {
        transit("TYPING", "USER_STARTED_TYPING");
      };
    }
  };
};


class FSM {
  constructor (createStateToInputHandlerMap, initialState) {
    this._subscribers = []
 
    this.stateToInputHandlerMap = createStateToInputHandlerMap((nextState, output) => {
      this.current.state = nextState;
      this.current.inputHandler = this.stateToInputHandlerMap[nextState]();
      for (let sub of this._subscribers) {
        sub.onOutput(output);
      }
    });

    this.current = {
      state: initialState,
      inputHandler: this.stateToInputHandlerMap[initialState]()
    };
  }
  send () {
    this.current.inputHandler();
  }
  subscribe (subscriber)  {
    this._subscribers.push(subscriber);
  }
}

export default function App() {
  const inputEl = useRef(null);

  const handleChange = (function() {
    const fsm = new FSM(inputHandlersFactory, "IDLE");
    fsm.subscribe({
      onOutput: output => {
        console.log({ type: output });
      }
    });
    return () => {
      fsm.send();
    };
  })();

  return <input type="text" ref={inputEl} onChange={handleChange} />;
}
