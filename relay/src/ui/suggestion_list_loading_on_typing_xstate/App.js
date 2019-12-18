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

export default function App({ machine }) {
  console.log("render: App");
  const [current, send] = useMachine(machine);

  function handleKeyDown(e) {
    let type = keyCodeToEventTypeMap[e.keyCode];
    type && send({ type });
  }
  console.log(current.value, current.event, current.context);
  return (
    <WithStyle>
      <div>
        <input
          value={current.context.inputValue}
          onChange={e => send({ type: "TYPING", inputValue: e.target.value })}
          onKeyDown={handleKeyDown}
        />
        <SendContext.Provider value={send}>
          {current.matches("working.loading") && <Loading />}
          {current.matches("working.error") && <Error />}
          {current.matches("working.ok") && <Ok state={current.context} />}
        </SendContext.Provider>
      </div>
    </WithStyle>
  );
}

const Loading = () => {
  console.log("render: Loading");
  return <p>loading...</p>;
};

const Error = () => {
  console.log("render: Bad");
  return <p>shit</p>;
};

const Ok = ({ state }) => {
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
            isPointed={j === state.pointedIndex}
          />
        ))}
      </ul>
    </div>
  );
};

const Item = React.memo(function Item({ text, index, isPointed }) {
  console.log("render: ListItem", text, isPointed);
  const send = useContext(SendContext);
  return (
    <li
      data-is_pointed={isPointed}
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
