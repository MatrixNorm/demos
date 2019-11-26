import React, { useRef } from "react";

const inputHandlersFactory = function(transit) {
  return {
    TYPING: function() {
      let timeoutId = setTimeout(() => {
        transit("IDLE", "USER_STOPPED_TYPING");
      }, 100);
      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          transit("IDLE", "USER_STOPPED_TYPING");
        }, 100);
      };
    },
    IDLE: function() {
      return () => {
        transit("TYPING", "USER_STARTED_TYPING");
      };
    }
  };
};

const fsmFactory = function(inputHandlersFactory) {
  let current = {};

  const inputHandlers = inputHandlersFactory((nextState, output) => {
    current.state = nextState;
    current.inputHandler = inputHandlers[nextState]();
    for (let sub of _subscribers) {
      sub.onOutput(output);
    }
  });

  current.state = "IDLE";
  current.inputHandler = inputHandlers[current.state]();

  const _subscribers = [];

  return {
    sendInput: () => {
      current = current.inputHandler();
    },
    subscribeToOutput: subscriber => {
      _subscribers.push(subscriber);
    }
  };
};

export default function App() {
  const inputEl = useRef(null);

  const handleChange = (function() {
    const fsm = fsmFactory(inputHandlersFactory);
    fsm.subscribeToOutput({
      onOutput: output => {
        dispatchEvent({ type: output });
      }
    });
    return () => {
      fsm.sendInput();
    };
  })();

  return <input type="text" ref={inputEl} onChange={handleChange} />;
}
