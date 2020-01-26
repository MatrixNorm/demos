import React, {
  useCallback,
  useMemo,
  useRef,
  useReducer,
  useState
} from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
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
        <SuggestionList onSelect={handleSuggestionsClose} />
      )}
    </>
  );
}

function SuggestionList({ onSelect }) {
  const [items] = useState(["Aa", "Bb", "Cc", "Dd", "Ee"]);
  const [selectedIdx, setSelectedIdx] = useState(null);

  const onSelectListItem = useCallback(index => {
    setSelectedIdx(index);
  }, []);
  console.log("render", selectedIdx);
  return (
    <div onClick={onSelect}>
      <ul
        css={css`
          padding: 0;
          margin: 0;
        `}
      >
        {items.map((item, j) => (
          <SuggestionListItem
            key={j}
            index={j}
            onSelectListItem={onSelectListItem}
            // isHovered={j === hoveredIdx}
            text={item}
          />
        ))}
      </ul>
    </div>
  );
}

const SuggestionListItem = React.memo(function({
  index,
  text,
  onSelectListItem
}) {
  const [isHovered, setIsHovered] = useState(false);
  console.log(text, isHovered);
  const style = isHovered
    ? css`
        background-color: #dedcdc;
      `
    : css``;
  return (
    <li
      css={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectListItem(index)}
    >
      {text}
    </li>
  );
});
