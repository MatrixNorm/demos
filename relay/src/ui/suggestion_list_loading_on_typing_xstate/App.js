import React, { useContext } from "react";
import { useMachine } from "@xstate/react";
import styled from "styled-components";

const KEY_CODE = {
  ARROW_DOWN: 40,
  ARROW_UP: 38,
  ENTER: 13
};

const keyCodeToEventTypeMap = {
  [KEY_CODE.ARROW_DOWN]: "KEY_ARROW_DOWN",
  [KEY_CODE.ARROW_UP]: "KEY_ARROW_UP",
  [KEY_CODE.ENTER]: "KEY_ENTER"
};

const SendContext = React.createContext();

const WithStyle = styled.div`
  .suggestions-list {
    padding: 0;
    margin: 0;
  }

  [data-is_pointed="true"] {
    background-color: #7cbd67;
  }
`;

export default function App() {
  console.log("render: App");
  const [current, send] = useMachine();

  function handleKeyDown(e) {
    let type = keyCodeToEventTypeMap[e.keyCode];
    type && send({ type });
  }
  console.log(current.value, current.event, current.context);
  return (
    <WithStyle>
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
    </WithStyle>
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
      <ul
        className="suggestions-list"
        onMouseLeave={() => send({ type: "MOUSE_LEAVED_LIST" })}
      >
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

const Item = React.memo(function Item({ text, index, isHovered }) {
  console.log("render: ListItem", text, isHovered);
  const send = useContext(SendContext);
  return (
    <li
      data-is_pointed={isHovered}
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
