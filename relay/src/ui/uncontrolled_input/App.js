import React, { useRef } from "react";

const fsmFactory = function(next) {
  return {
    TYPING: function() {
      let timeoutId = setTimeout(() => {
        next("IDLE");
      }, 100);
      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          next("IDLE");
        }, 100);
      };
    },
    IDLE: function() {
      return () => {
        next("TYPING");
      };
    }
  };
};

export default function App() {
  const inputEl = useRef(null);

  const handleChange = (function() {
    let current;
    const fsm = fsmFactory(nextState => {
      current = fsm[nextState]();
    });
    current = fsm["IDLE"]();
    return () => {
      current();
    };
  })();

  return <input type="text" ref={inputEl} onChange={handleChange} />;
}
