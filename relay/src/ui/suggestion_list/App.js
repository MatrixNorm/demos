import React, { useContext, useReducer, useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const DispatchContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "USER_SELECTED_SUGGESTION":
      return { ...state, inputValue: action.suggestion };
    case "TEXT_INPUT_CHANGE":
      return { ...state, inputValue: action.inputValue };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, { inputValue: "" });
  console.log("render", state);
  return (
    <div>
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
        <SuggestionList />
      </DispatchContext.Provider>
    </div>
  );
}

const SuggestionList = React.memo(function() {
  const [items] = useState(["Aa", "Bb", "Cc", "Dd", "Ee"]);
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
});

const SuggestionListItem = React.memo(function({ text }) {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useContext(DispatchContext);
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
