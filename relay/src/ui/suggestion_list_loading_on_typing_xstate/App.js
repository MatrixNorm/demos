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
                resolve({ items: ["Aa", "Bb", "Cc", "Dd", "Ee"] }),
              1000000000000000000
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
  console.log(current.value, current.event, current.context)
  return (
    <div>
      <div>{JSON.stringify(current.value)}</div>
      <input
        value={current.context.inputValue}
        onChange={e => send({ type: "TYPING", inputValue: e.target.value })}
        onKeyDown={handleKeyDown}
      />
      <SendContext.Provider value={send}>
        {current.matches("notTyping.loading") && <Loading />}
        {current.matches("notTyping.bad") && <Bad />}
        {current.matches("notTyping.requestOk") && (
          <RequestOk state={current.context} />
        )}
      </SendContext.Provider>
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

const RequestOk = ({ state }) => {
  console.log("render: RequestOk");
  const send = useContext(SendContext);

  return (
    <div>
      <ul onMouseLeave={() => send({ type: "MOUSE_LEAVED_LIST" })}>
        {state.items.map((item, j) => (
          <Item
            key={j}
            index={j}
            text={item}
            isHovered={j === state.cursorIndex}
          />
        ))}
      </ul>
    </div>
  );
};

const Item = React.memo(function({ text, index, isHovered }) {
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
