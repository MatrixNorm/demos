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

const DispatchContext = React.createContext();

const initialState = {
  fsmState: "idle",
  inputValue: "",
  suggestions: null,
  pointedIndex: null
};

export default function App() {
  console.log("render: App");
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleKeyDown(e) {
    let type = keyCodeToEventTypeMap[e.keyCode];
    type && dispatch({ type });
  }

  const handleTextInputChange = useMemo(() => {
    return e => {
      dispatch({
        type: "TYPING",
        inputValue: e.target.value
      });
      showDropdown();
    };
  }, []);

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
