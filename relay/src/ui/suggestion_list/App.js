import React, {
  useCallback,
  useContext,
  useReducer,
  useRef,
  useState
} from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const ReduxContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "USER_SELECTED_SUGGESTION":
      return { ...state, inputValue: action.suggestion };
    default:
      return state;
  }
}

export default function App() {
  const inputEl = useRef(null);
  const [state, dispatch] = useReducer(reducer, { inputValue: "" });
  console.log("render", state);
  return (
    <ReduxContext.Provider value={{ state, dispatch }}>
      <input type="text" ref={inputEl} />
      <SuggestionList />
    </ReduxContext.Provider>
  );
}

function SuggestionList() {
  const [items] = useState(["Aa", "Bb", "Cc", "Dd", "Ee"]);
  const [selectedIdx, setSelectedIdx] = useState(null);

  // const onSelectListItem = useCallback(index => {
  //   setSelectedIdx(index);
  // }, []);
  console.log("render", selectedIdx);
  return (
    <div>
      <ul
        css={css`
          padding: 0;
          margin: 0;
        `}
      >
        {items.map((item, j) => (
          <SuggestionListItem key={j} index={j} text={item} />
        ))}
      </ul>
    </div>
  );
}

const SuggestionListItem = React.memo(function({ index, text }) {
  const [isHovered, setIsHovered] = useState(false);
  const { dispatch } = useContext(ReduxContext);
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
