import React, { useContext, useEffect, useMemo, useState } from "react";

import { Machine } from "xstate";
import { useMachine } from "@xstate/react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { createSuggestionMachine } from "./machine";

const KEY_CODE = {
  ARROW_DOWN: 40,
  ARROW_UP: 38,
  ENTER: 13
};

const StateContext = React.createContext();
const SendContext = React.createContext();

export default function App() {
  console.log("render: App");
  const [current, send] = useMachine(
    Machine(
      createSuggestionMachine({
        fetchItems: query =>
          new Promise(resolve => {
            setTimeout(
              () =>
                resolve({ data: { items: ["Aa", "Bb", "Cc", "Dd", "Ee"] } }),
              1000
            );
          }),
        isQueryValid: q => q && q.trim().length > 0
      })
    )
  );

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
    <div>
      <input
        value={current.context.inputValue}
        onChange={e => send({ type: "TYPING", inputValue: e.target.value })}
        onKeyDown={handleKeyDown}
      />
      <StateContext.Provider value={current}>
        <SendContext.Provider value={send}>
          {current.matches("notTyping.loading") && <Loading />}
          {current.matches("notTyping.bad") && <Bad />}
          {current.matches("notTyping.requestOk") && <RequestOk />}
        </SendContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

const Loading = () => {
  console.log("render: Loading");
  return <p>loading...</p>;
};

const Bad = () => {
  console.log("render: Bad");
  return <p>shit</p>;
};

const RequestOk = () => {
  console.log("render: RequestOk");
  const send = useContext(SendContext);
  const state = useContext(StateContext);

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
};

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
