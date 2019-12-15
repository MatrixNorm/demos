import React, { useCallback, useContext, useMemo } from "react";
import styled from "styled-components";
import { debounce } from "../../utils/fsm";
import reducer from "./reducers";
import useMyReducer from "./hooks";

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

const DispatchContext = React.createContext();

const initialState = {
  fsm: null,
  inputValue: "",
  suggestions: null,
  pointedIndex: null
};

const WithStyle = styled.div`
  .suggestions-list {
    padding: 0;
    margin: 0;
  }

  [data-is_pointed="true"] {
    background-color: #7cbd67;
  }
`;

export default function App({ commandConfig }) {
  console.log("render: App");
  const [state, dispatch] = useMyReducer(reducer, initialState, {
    commandConfig
  });

  function handleKeyDown(e) {
    let type = keyCodeToEventTypeMap[e.keyCode];
    type && dispatch({ type });
  }

  const handleTextInputChange = useCallback(e => {
    dispatch({
      type: "TYPING",
      inputValue: e.target.value
    });
    onStopTyping();
  }, []);

  const onStopTyping = useMemo(() => {
    return debounce(() => {
      dispatch({ type: "STOP_TYPING" });
    }, 500);
  }, []);

  return (
    <WithStyle>
      <div onKeyDown={handleKeyDown}>
        <input
          type="text"
          value={state.inputValue}
          onChange={handleTextInputChange}
          onBlur={() => dispatch({ type: "INPUT_BLUR" })}
        />
        <DispatchContext.Provider value={dispatch}>
          {state.fsmState === "loading" && <Loading />}
          {state.fsmState === "ok" && (
            <Ok
              suggestions={state.suggestions}
              pointedIndex={state.pointedIndex}
            />
          )}
          {state.fsmState === "error" && <Error error={state.errorMsg} />}
        </DispatchContext.Provider>
      </div>
    </WithStyle>
  );
}

const Loading = () => {
  console.log("render: Loading");
  return <p>loading...</p>;
};

const Error = ({ error }) => {
  console.log("render: Bad");
  return <p>{error}</p>;
};

const Ok = function({ suggestions, pointedIndex }) {
  console.log("render: SuggestionList");

  const dispatch = useContext(DispatchContext);

  return (
    <div>
      <ul
        className="suggestions-list"
        onMouseLeave={() =>
          dispatch({ type: "MOUSE_LEAVE_ITEMS", value: null })
        }
      >
        {suggestions.map((sugg, j) => (
          <SuggestionListItem
            key={j}
            index={j}
            text={sugg}
            isPointed={j === pointedIndex}
          />
        ))}
      </ul>
    </div>
  );
};

const SuggestionListItem = React.memo(function SuggestionListItem({
  text,
  index,
  isPointed
}) {
  console.log("render: ListItem", text, index, isPointed);
  const dispatch = useContext(DispatchContext);
  return (
    <li
      data-is_pointed={isPointed}
      onMouseEnter={() =>
        dispatch({ type: "MOUSE_ENTER_ITEM", itemIndex: index })
      }
      onMouseDown={() =>
        dispatch({
          type: "MOUSE_CLICK_ITEM",
          itemText: text
        })
      }
    >
      {text}
    </li>
  );
});
