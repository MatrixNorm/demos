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
      return { ...state, showSuggestions: action.inputValue.trim().length > 0 };
    case "CLOSE_SUGGESTIONS":
      return { ...state, showSuggestions: false };
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
        dispatch({ type: output, inputValue: inputEl.current.value });
      }
    });
    return () => {
      fsm.send();
    };
  }, []);

  const handleSuggestionsClose = () => {
    dispatch({ type: "CLOSE_SUGGESTIONS" });
  };

  return (
    <>
      <input type="text" ref={inputEl} onChange={handleChange} />
      {state.showSuggestions && (
        <div onClick={handleSuggestionsClose}>suggestions</div>
      )}
    </>
  );
}
