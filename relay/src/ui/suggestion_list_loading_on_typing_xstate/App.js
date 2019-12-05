import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import { Machine } from "xstate";
import { useMachine } from "@xstate/react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { suggestionMachineDef } from "./machine";
import { createElement as createDebouncedInput } from "../../xstate/debounce3/debounce";

const KEY_CODE = {
  ARROW_DOWN: 40,
  ARROW_UP: 38,
  ENTER: 13
};

const SendContext = React.createContext();

export default function App() {
  console.log("render: App");
  const [current, send] = useMachine(
    Machine(suggestionMachineDef, {
      actions: {
        setTextInput: ctx => resetInput(ctx.items["cursorIndex"])
      }
    })
  );

  const [inputEl, resetInput] = useMemo(() => {
    const onStartTyping = inputValue => {
      console.log("StartTyping", inputValue);
    };
    const onFinishTyping = inputValue => {
      console.log("FinishTyping", inputValue);
    };
    return createDebouncedInput({
      debounceDuration: 2000,
      initialInputValue: "",
      onStartTyping,
      onFinishTyping
    });
  });

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
      {inputEl}
      <SendContext.Provider value={send}>
        {current.matches("working") && (
          <SuggestionList selectedIndex={current.context.cursorIndex} />
        )}
      </SendContext.Provider>
    </div>
  );
}

const SuggestionList = React.memo(function({ cursorIndex }) {
  console.log("render: SuggestionList");
  const send = useContext(SendContext);
  const [items, setItems] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setItems(["Aa", "Bb", "Cc", "Dd", "Ee"]);
      send({ type: "REQUEST_DONE", value: items });
    }, 2000);
  }, []);

  return (
    <div>
      <ul
        css={css`
          padding: 0;
          margin: 0;
        `}
        onMouseLeave={() => send({ type: "MOUSE_LEAVED_LIST" })}
      >
        {items &&
          items.map((item, j) => (
            <SuggestionListItem
              key={j}
              index={j}
              text={item}
              isHovered={j === cursorIndex}
            />
          ))}
      </ul>
    </div>
  );
});

const SuggestionListItem = React.memo(function({ text, index, isHovered }) {
  console.log("render: ListItem", text, isHovered);
  const send = useContext(SendContext);
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
          itemIndex: index
        })
      }
    >
      {text}
    </li>
  );
});
