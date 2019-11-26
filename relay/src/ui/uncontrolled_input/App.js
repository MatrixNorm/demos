import React, { useRef } from "react";
import FSM from "../../utils/fsm";

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
