import { Machine, assign, interpret } from "xstate";

const debounceMachineDef = {
  context: {
    timeoutId: null,
    fnArgs: undefined
  },
  states: {
    idle: {
      on: {
        HAPPENING: {
          target: "happening"
        }
      }
    },
    happening: {
      HAPPENING: {
        action: null
      },
      TIMEOUT: {
        target: "idle"
      }
    }
  }
};

function debounce(fn, duration) {
  const machine = Machine(debounceMachineDef);
  const service = interpret(machine).onTransition(state => {
    console.log(state.value);
  });
  return fnArgs => {
    service.send({ type: "HAPPENING", fnArgs });
  };
}

export const suggestionMachine = Machine({
  id: "suggestionMachine",
  context: {
    items: null,
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
      exit: [
        assign({
          items: null,
          cursorIndex: null
        })
      ],
      on: {
        INPUT_BLUR: "dropdownClosed",
        USER_RESUMED_TYPING: "dropdownClosed"
      },
      initial: "loading",
      states: {
        loading: {
          on: {
            REQUEST_FAILED: "error",
            REQUEST_SUCCEEDED: {
              target: "loaded",
              actions: assign({
                items: (_ctx, evt) => evt.items
              })
            }
          }
        },
        error: {
          final: true
        },
        loaded: {
          on: {
            MOUSE_ENTERED_ITEM: {
              actions: assign({
                cursorIndex: (_ctx, evt) => evt.itemIndex
              })
            },
            MOUSE_LEAVED_LIST: {
              actions: assign({
                cursorIndex: null
              })
            },
            MOUSE_CLICKED_ITEM: {
              target: "dropdownClosed",
              actions: assign({
                selectedSuggestion: (_ctx, evt) => evt.itemValue
              })
            },
            KEY_ARROW_DOWN: {
              actions: assign({
                cursorIndex: ctx =>
                  ctx.cursorIndex ? (ctx.cursorIndex + 1) % ctx.items.length : 0
              })
            },
            KEY_ARROW_UP: {
              actions: assign({
                cursorIndex: ctx =>
                  ctx.cursorIndex
                    ? (ctx.cursorIndex - 1) % ctx.items.length
                    : null
              })
            },
            KEY_ENTER: {
              target: "dropdownClosed"
            }
          }
        }
      }
    }
  }
});
