import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import { useMachine } from "@xstate/react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { suggestionMachine } from "./machine";
import { debounce } from "../../utils/fsm";

const KEY_CODE = {
  ARROW_DOWN: 40,
  ARROW_UP: 38,
  ENTER: 13
};

const DispatchContext = React.createContext();

export default function App() {
  console.log("render: App");
  const [current, send] = useMachine(suggestionMachine);

  function handleKeyDown(e) {
    console.log(e.keyCode);
    if (e.keyCode === KEY_CODE.ARROW_DOWN) {
      send({ type: "KEY_ARROW_DOWN" });
    }
    if (e.keyCode === KEY_CODE.ARROW_UP) {
      send({ type: "KEY_ARROW_UP" });
    }
    if (e.keyCode === KEY_CODE.ENTER) {
      send({ type: "KEY_ENTER" });
    }
  }

  return (
    <div onKeyDown={handleKeyDown}>
      <input
        type="text"
        value={current.context.inputValue}
        onChange={e =>
          send({
            type: "TEXT_INPUT_CHANGE",
            inputValue: e.target.value
          })
        }
      />
      <DispatchContext.Provider value={send}>
        {current.matches("dropdownOpen") && (
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
  const send = useContext(DispatchContext);
  const style = isHovered
    ? css`
        background-color: #dedcdc;
      `
    : css``;
  return (
    <li
      css={style}
      onMouseEnter={() =>
        send({ type: "MOUSE_ENTERED_ITEM", itemIndex: index })
      }
      onClick={() =>
        send({
          type: "MOUSE_CLICKED_ITEM",
          itemValue: text
        })
      }
    >
      {text}
    </li>
  );
});
