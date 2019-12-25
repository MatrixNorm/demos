import React, { useContext } from "react";
import { useService } from "@xstate/react";

const KEY_CODE = {
  ARROW_DOWN: 40,
  ARROW_UP: 38,
  ENTER: 13,
  ESCAPE: 27
};

const keyCodeToEventTypeMap = {
  [KEY_CODE.ARROW_DOWN]: "INPUT_ARROW_DOWN",
  [KEY_CODE.ARROW_UP]: "INPUT_ARROW_UP",
  [KEY_CODE.ENTER]: "INPUT_ENTER",
  [KEY_CODE.ESCAPE]: "INPUT_ESCAPE"
};

const SendContext = React.createContext();

export default function App({ service }) {
  console.log("render: App");
  const [current, send] = useService(service);

  function handleKeyDown(e) {
    let type = keyCodeToEventTypeMap[e.keyCode];
    type && send({ type });
  }

  return (
    <div>
      <input
        value={current.context.inputValue}
        onChange={e => send({ type: "TYPING", inputValue: e.target.value })}
        onKeyDown={handleKeyDown}
        onBlur={() => send({ type: "CLOSE_LIST" })}
      />
      <SendContext.Provider value={send}>
        {current.matches("working.loading") && <Loading />}
        {current.matches("working.error") && (
          <Error errorMsg={current.context.errorMsg} />
        )}
        {current.matches("working.ok") && <Ok state={current.context} />}
      </SendContext.Provider>
    </div>
  );
}

const Loading = () => {
  return <p>loading...</p>;
};

const Error = ({ errorMsg }) => {
  const send = useContext(SendContext);
  return (
    <div>
      <span>{errorMsg}</span>
      <button onClick={() => send({ type: "DISMISS_MESSAGE" })}>close</button>
    </div>
  );
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
      onMouseDown={() =>
        send({
          type: "MOUSE_CLICKED_ITEM",
          itemText: text
        })
      }
    >
      {text}
    </li>
  );
});
