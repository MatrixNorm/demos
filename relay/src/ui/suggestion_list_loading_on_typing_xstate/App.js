import React, { useContext, useEffect, useMemo, useState } from "react";

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
      },
      guards: {
        serchTermIsValid: (_, evt) => {
          return evt.query && evt.query.trim().length > 0;
        },
        isLoadingError: (_, evt) => {
          evt.isError || !Array.isArray(evt.payload);
        },
        isItemsListEmpty: (_, evt) => {
          let p = evt.payload;
          !evt.isError && Array.isArray(p) && p.length > 0;
        }
      }
    })
  );

  const [inputEl, resetInput] = useMemo(() => {
    return createDebouncedInput({
      debounceDuration: 2000,
      initialInputValue: "",
      onStartTyping: inputValue => {
        console.log("StartTyping", inputValue);
        send({ type: "USER_START_TYPING" });
      },
      onFinishTyping: inputValue => {
        console.log("FinishTyping", inputValue);
        send({ type: "USER_ASKED_FOR_SUGGESTIONS", query: inputValue });
      }
    });
  }, []);

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
  console.log(current, current.context);
  return (
    <div onKeyDown={handleKeyDown}>
      {inputEl}
      <SendContext.Provider value={send}>
        {(current.matches("loading_result") || current.matches("loading")) && (
          <MockQueryRenderer cursorIndex={current.context.cursorIndex} />
        )}
      </SendContext.Provider>
    </div>
  );
}

const MockQueryRenderer = React.memo(function({ cursorIndex /* XXX */  }) {
  console.log("render: MockQueryRenderer", cursorIndex);
  const send = useContext(SendContext);
  const [items, setItems] = useState(null);

  useEffect(() => {
    const timerId = setTimeout(() => {
      let data = ["Aa", "Bb", "Cc", "Dd", "Ee"];
      setItems(data);
      send({ type: "REQUEST_DONE", payload: data });
    }, 3000);
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  if (items === null) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <ul
        css={css`
          padding: 0;
          margin: 0;
        `}
        onMouseLeave={() => send({ type: "MOUSE_LEAVED_LIST" })}
      >
        {items.map((item, j) => (
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
