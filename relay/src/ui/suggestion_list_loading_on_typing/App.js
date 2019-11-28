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

const KEY_CODE = {
  ARROW_DOWN: 40,
  ARROW_UP: 38,
  ENTER: 13
};

const DispatchContext = React.createContext();

const initialState = {
  inputValue: "",
  selectedIndex: null,
  suggestions: null,
  showDropdown: false
};

function reducer(state, action) {
  switch (action.type) {
    case "SHOW_DROPDOWN":
      return {
        ...state,
        showDropdown: true
      };
    case "USER_SELECTED_SUGGESTION":
      return {
        ...state,
        inputValue: action.suggestion,
        selectedIndex: null,
        suggestions: null,
        showDropdown: false
      };
    case "USER_CLOSED_SUGGESTION":
      return {
        ...state,
        selectedIndex: null,
        suggestions: null,
        showDropdown: false
      };
    case "TEXT_INPUT_CHANGE":
      return {
        ...state,
        inputValue: action.inputValue,
        selectedIndex: null,
        suggestions: null,
        showDropdown: false
      };
    case "SET_SELECTED_INDEX":
      return { ...state, selectedIndex: action.value };
    case "INCREMENT_SELECTED_INDEX": {
      if (!state.showDropdown) {
        return state;
      }
      let selectedIndex = (state.selectedIndex + 1) % state.suggestions.length;
      return {
        ...state,
        selectedIndex,
        inputValue: state.suggestions[selectedIndex]
      };
    }
    case "DECREMENT_SELECTED_INDEX": {
      if (!state.showDropdown) {
        return state;
      }
      let selectedIndex = (state.selectedIndex + 1) % state.suggestions.length;
      return {
        ...state,
        selectedIndex,
        inputValue: state.suggestions[selectedIndex]
      };
    }
    case "SUGGESTION_LIST_LOADED":
      return { ...state, suggestions: action.value };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("render: App", state);

  function handleKeyDown(e) {
    console.log(e.keyCode);
    if (e.keyCode === KEY_CODE.ARROW_DOWN) {
      dispatch({ type: "INCREMENT_SELECTED_INDEX", value: null });
    }
    if (e.keyCode === KEY_CODE.ARROW_UP) {
      dispatch({ type: "DECREMENT_SELECTED_INDEX", value: null });
    }
    if (e.keyCode === KEY_CODE.ENTER) {
      dispatch({ type: "USER_CLOSED_SUGGESTION" });
    }
  }

  function handleTextInputChange(e) {
    dispatch({
      type: "TEXT_INPUT_CHANGE",
      inputValue: e.target.value
    });
    showDropdown();
  }

  const showDropdown = useMemo(() => {
    return debounce(() => {
      dispatch({ type: "SHOW_DROPDOWN" });
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
        {state.showDropdown && (
          <SuggestionList selectedIndex={state.selectedIndex} />
        )}
      </DispatchContext.Provider>
    </div>
  );
}

const SuggestionList = React.memo(function({ selectedIndex }) {
  console.log("render: SuggestionList");
  const dispatch = useContext(DispatchContext);
  const [items] = useState(["Aa", "Bb", "Cc", "Dd", "Ee"]);

  useEffect(() => {
    dispatch({ type: "SUGGESTION_LIST_LOADED", value: items });
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
  console.log("render: ListItem", text, isHovered);
  const dispatch = useContext(DispatchContext);
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
