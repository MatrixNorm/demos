import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const KEY_CODE = {
  ARROW_DOWN: 40,
  ARROW_UP: 38
};

const DispatchContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "USER_SELECTED_SUGGESTION":
      return { ...state, inputValue: action.suggestion };
    case "TEXT_INPUT_CHANGE":
      return { ...state, inputValue: action.inputValue };
    case "SET_SELECTED_INDEX":
      return { ...state, selectedIndex: action.value };
    case "INCREMENT_SELECTED_INDEX":
      return {
        ...state,
        selectedIndex: (state.selectedIndex + 1) % state.suggestionsLength
      };
    case "DECREMENT_SELECTED_INDEX":
      return {
        ...state,
        selectedIndex: (state.selectedIndex - 1) % state.suggestionsLength
      };
    case "SET_SUGGESTION_LIST_LENGTH":
      return { ...state, suggestionsLength: action.value };
    default:
      return state;
  }
}

const initialState = {
  inputValue: "",
  selectedIndex: null,
  suggestionsLength: null
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("render: App", state);

  function handleKeyDown(e) {
    if (e.keyCode === KEY_CODE.ARROW_DOWN) {
      dispatch({ type: "INCREMENT_SELECTED_INDEX", value: null });
    }
    if (e.keyCode === KEY_CODE.ARROW_UP) {
      dispatch({ type: "DECREMENT_SELECTED_INDEX", value: null });
    }
  }

  return (
    <div onKeyDown={handleKeyDown}>
      <input
        type="text"
        value={state.inputValue}
        onChange={e =>
          dispatch({
            type: "TEXT_INPUT_CHANGE",
            inputValue: e.target.value
          })
        }
      />
      <DispatchContext.Provider value={dispatch}>
        <SuggestionList selectedIndex={state.selectedIndex} />
      </DispatchContext.Provider>
    </div>
  );
}

const SuggestionList = React.memo(function({ selectedIndex }) {
  console.log("render: SuggestionList");
  const dispatch = useContext(DispatchContext);
  const [items] = useState(["Aa", "Bb", "Cc", "Dd", "Ee"]);

  useEffect(() => {
    dispatch({ type: "SET_SUGGESTION_LIST_LENGTH", value: 5 });
  }, []);

  const handleMouseLeaveList = useCallback(() => {
    dispatch({ type: "SET_SELECTED_INDEX", value: null });
  }, []);

  return (
    <div>
      <ul
        css={css`
          padding: 0;
          margin: 0;
        `}
        onMouseLeave={handleMouseLeaveList}
      >
        {items.map((item, j) => (
          <SuggestionListItem
            key={j}
            index={j}
            text={item}
            isHovered={j === selectedIndex}
          />
        ))}
      </ul>
    </div>
  );
});

const SuggestionListItem = React.memo(function({ text, index, isHovered }) {
  const dispatch = useContext(DispatchContext);
  console.log("rende: ListItem", text, isHovered);
  const style = isHovered
    ? css`
        background-color: #dedcdc;
      `
    : css``;
  return (
    <li
      css={style}
      onMouseEnter={() =>
        dispatch({ type: "SET_SELECTED_INDEX", value: index })
      }
      onClick={() =>
        dispatch({
          type: "USER_SELECTED_SUGGESTION",
          suggestion: text
        })
      }
    >
      {text}
    </li>
  );
});
