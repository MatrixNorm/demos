import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer
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
  return { suggestions };
};

const commandInterpreter = function(command, dispatch) {
  if (command) {
    switch (command.type) {
      case "LOAD_SUGGESTIONS": {
        fetchSuggestions({ query: command.query })
          .then(data =>
            dispatch({
              type: "LOAD_OK",
              suggestions: data.suggestions,
              fsmId: command.fsmId
            })
          )
          .catch(error =>
            dispatch({ type: "LOAD_ERROR", error, fsmId: command.fsmId })
          );
      }
    }
  }
};

const DispatchContext = React.createContext();

const initialState = [
  {
    fsm: null,
    inputValue: "",
    suggestions: null,
    pointedIndex: null
  },
  null
];

function useMyReducer(reducer, initialState) {
  const [stateAndMaybeCommand, dispatch] = useReducer(reducer, initialState);

  let state, command;
  if (!Array.isArray(stateAndMaybeCommand)) {
    [state, command] = [stateAndMaybeCommand, null];
  } else {
    [state, command] = stateAndMaybeCommand;
  }

  const myDispatch = useCallback(action =>
    dispatch({ ...action, fsmId: state.fsm?.id })
  );

  return [[state, command], myDispatch];
}

export default function App() {
  console.log("render: App");
  const [[state, command], dispatch] = useMyReducer(reducer, initialState);

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
      <DispatchContext.Provider value={dispatch}>
        {state.fsm && state.fsm.state === "loading" && <Loading />}
        {state.fsm && state.fsm.state === "ok" && (
          <Ok
            suggestions={state.suggestions}
            pointedIndex={state.pointedIndex}
          />
        )}
        {state.fsm && state.fsm.state === "error" && (
          <Error error={state.errorMsg} />
        )}
      </DispatchContext.Provider>
    </div>
  );
}

const Loading = () => {
  console.log("render: Loading");
  return <p>loading...</p>;
};

const Error = ({ error }) => {
  console.log("render: Bad");
  return <p>{error}</p>;
};

const Ok = function({ suggestions, pointedIndex }) {
  console.log("render: SuggestionList");

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
          <SuggestionListItem
            key={j}
            index={j}
            text={sugg}
            isPointed={j === pointedIndex}
          />
        ))}
      </ul>
    </div>
  );
};

const SuggestionListItem = React.memo(function({ text, index, isPointed }) {
  console.log("render: ListItem", text, index, isPointed);
  const dispatch = useContext(DispatchContext);
  const style = isPointed
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
