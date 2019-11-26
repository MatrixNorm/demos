import React, { useMemo, useRef, useReducer } from "react";
import { createDebounceStateMachine } from "../../utils/fsm";

const initialState = {
  showSuggestions: false
};

function reducer(state, action) {
  switch (action.type) {
    case "USER_STARTED_TYPING":
      return { ...state, showSuggestions: false };
    case "USER_STOPPED_TYPING":
      return { ...state, showSuggestions: true };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputEl = useRef(null);

  const handleChange = useMemo(function() {
    const fsm = createDebounceStateMachine(500);
    fsm.subscribe({
      onOutput: output => {
        console.log({ type: output });
        dispatch({ type: output });
      }
    });
    return () => {
      fsm.send();
    };
  }, []);

  return (
    <>
      <input type="text" ref={inputEl} onChange={handleChange} />
      {state.showSuggestions && <div>suggestions</div>}
    </>
  );
}
