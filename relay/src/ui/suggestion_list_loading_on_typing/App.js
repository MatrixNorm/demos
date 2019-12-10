import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState
} from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { debounce } from "../../utils/fsm";
import reducer from "./reducers";

const KEY_CODE = {
  ARROW_DOWN: 40,
  ARROW_UP: 38,
  ENTER: 13
};

const keyCodeToEventTypeMap = {
  [KEY_CODE.ARROW_DOWN]: "INPUT_ARROW_DOWN",
  [KEY_CODE.ARROW_UP]: "INPUT_ARROW_UP",
  [KEY_CODE.ENTER]: "INPUT_ENTER"
};

const fetchSuggestions = async function({ query }) {
  let suggestions = ["Aa", "Bb", "Cc", "Dd", "Ee"];
};

const commandInterpreter = function(command, dispatch) {
  if (command) {
    switch (command.type) {
      case "LOAD_SUGGESTIONS": {
        fetchSuggestions({ query: command.query })
          .then(data =>
            dispatch({ type: "LOAD_OK", suggestions: data.suggestions })
          )
          .catch(error => dispatch({ type: "LOAD_ERROR", error }));
      }
    }
  }
};

const DispatchContext = React.createContext();
const StateContext = React.createContext();

const initialState = {
  fsmState: "idle",
  inputValue: "",
  suggestions: null,
  pointedIndex: null
};

export default function App() {
  console.log("render: App");
  const [[state, command], dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    commandInterpreter(command, dispatch);
  });

  function handleKeyDown(e) {
    let type = keyCodeToEventTypeMap[e.keyCode];
    type && dispatch({ type });
  }

  const handleTextInputChange = useCallback(e => {
    dispatch({
      type: "TYPING",
      inputValue: e.target.value
    });
    onStopTyping();
  }, []);

  const onStopTyping = useMemo(() => {
    return debounce(() => {
      dispatch({ type: "STOP_TYPING" });
    }, 500);
  }, []);

  return (
    <div onKeyDown={handleKeyDown}>
      <input
        type="text"
        value={state.inputValue}
        onChange={handleTextInputChange}
      />
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          {state.fsmState === "loading" && <Loading />}
          {state.fsmState === "ok" && <Ok />}
          {state.fsmState === "error" && <Error />}
        </DispatchContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

const Ok = function() {
  console.log("render: SuggestionList");
  const { suggestions } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <div>
      <ul
        css={css`
          padding: 0;
          margin: 0;
        `}
        onMouseLeave={() =>
          dispatch({ type: "MOUSE_LEAVE_ITEMS", value: null })
        }
      >
        {suggestions.map((sugg, j) => (
          <SuggestionListItem key={j} index={j} suggestion={sugg} />
        ))}
      </ul>
    </div>
  );
};

const SuggestionListItem = React.memo(function({ text, index }) {
  console.log("render: ListItem", text, index);
  const { pointedIndex } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const style =
    index === pointedIndex
      ? css`
          background-color: #dedcdc;
        `
      : css``;
  return (
    <li
      css={style}
      onMouseEnter={() =>
        dispatch({ type: "MOUSE_ENTER_ITEM", itemIndex: index })
      }
      onClick={() =>
        dispatch({
          type: "MOUSE_CLICK_ITEM",
          itemText: text
        })
      }
    >
      {text}
    </li>
  );
});
