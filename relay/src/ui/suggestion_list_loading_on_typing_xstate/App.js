import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import * as xs from "xstate";
import { useMachine } from "@xstate/react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { debounce } from "../../utils/fsm";

const KEY_CODE = {
  ARROW_DOWN: 40,
  ARROW_UP: 38,
  ENTER: 13
};


const suggestionMachine = xs.Machine({
  id: "suggestionMachine",
  context: {
    selectedSuggestion: null,
    cursorIndex: null
  },
  initial: "dropdownClosed",
  states: {
    dropdownClosed: {
      on: {
        USER_STOPPED_TYPING: "dropdownOpen"
      }
    },
    dropdownOpen: {
      on: {
        INPUT_BLUR: "dropdownClosed",
        USER_RESUMED_TYPING: "dropdownClosed"
      },
      initial: "loading",
      states: {
        loading: {
          on: {
            REQUEST_FAILED: "error",
            REQUEST_SUCCEEDED: "loaded"
          }
        },
        error: {
          final: true
        },
        loaded: {
          on: {
            MOUSE_ENTERED_ITEM: {
              actions: xs.assign({
                cursorIndex: (_ctx, evt) => evt.itemIndex
              })
            },
            MOUSE_LEAVED_LIST: {
              actions: xs.assign({
                cursorIndex: null
              })
            },
            MOUSE_CLICKED_ITEM: {
              target: 'dropdownClosed',
              actions: xs.assign({
                selectedSuggestion: (_ctx, evt) => evt.itemValue,
                cursorIndex: null
              })
            },
            KEY_ARROW_DOWN: {
              actions: xs.assign({
                cursorIndex: (ctx) => ctx.cursorIndex ? (ctx.cursorIndex + 1) % ctx.items.length : 0
              })
            },
            KEY_ARROW_UP: {
              actions: xs.assign({
                cursorIndex: (ctx) => ctx.cursorIndex ? (ctx.cursorIndex - 1) % ctx.items.length : null
              })
            }
          }
         }
      }
    }
  }
});

const DispatchContext = React.createContext();

export default function App() {
  console.log("render: App");
  const [current, send] = useMachine(suggestionMachine);

  function handleKeyDown(e) {
    console.log(e.keyCode);
    if (e.keyCode === KEY_CODE.ARROW_DOWN) {
      dispatch({ type: "INCREMENT_SELECTED_INDEX", value: null });
    }
    if (e.keyCode === KEY_CODE.ARROW_UP) {
      dispatch({ type: "DECREMENT_SELECTED_INDEX", value: null });
    }
    if (e.keyCode === KEY_CODE.ENTER) {
      dispatch({ type: "USER_CLOSED_SUGGESTION" });
    }
  }

  function handleTextInputChange(e) {
    dispatch({
      type: "TEXT_INPUT_CHANGE",
      inputValue: e.target.value
    });
    showDropdown();
  }

  const showDropdown = useMemo(() => {
    return debounce(() => {
      dispatch({ type: "SHOW_DROPDOWN" });
    }, 500);
  }, []);

  return (
    <div onKeyDown={handleKeyDown}>
      <input
        type="text"
        value={state.inputValue}
        onChange={handleTextInputChange}
      />
      <DispatchContext.Provider value={dispatch}>
        {state.showDropdown && (
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
  const dispatch = useContext(DispatchContext);
  const style = isHovered
    ? css`
        background-color: #dedcdc;
      `
    : css``;
  return (
    <li
      css={style}
      onMouseEnter={() =>
        dispatch({ type: "SET_SELECTED_INDEX", value: index })
      }
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
