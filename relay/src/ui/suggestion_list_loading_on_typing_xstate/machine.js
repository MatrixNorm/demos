import { assign } from "xstate";

export function createMachine({ isQueryValid, fetchItems }) {
  let workingSubmachineDef = workingSubmachineDefFactory({
    isQueryValid,
    fetchItems
  });
  return machineDefFactory(workingSubmachineDef);
}

export const machineDefFactory = function(workingSubmachineDef) {
  const initialContext = {
    inputValue: "",
    items: null,
    cursorIndex: null,
    errorMsg: null
  };

  return {
    id: "suggestionsMachine",
    context: initialContext,
    initial: "idle",
    states: {
      idle: {
        id: "idle",
        on: {
          TYPING: "typing"
        }
      },
      typing: {
        entry: assign({
          inputValue: (_, evt) => {
            return evt.inputValue;
          }
        }),
        on: {
          TYPING: "typing"
        },
        after: {
          3000: "working"
        }
      },
      working: {
        on: {
          TYPING: "typing"
        },
        ...workingSubmachineDef
      }
    }
  };
};

const workingSubmachineDefFactory = function({ isQueryValid, fetchItems }) {
  return {
    initial: "entry",
    states: {
      entry: {
        on: {
          "": [
            {
              target: "loading",
              cond: ctx => {
                return isQueryValid(ctx.inputValue);
              }
            },
            {
              target: "error"
            }
          ]
        }
      },
      error: {
        on: {
          DISMISS: {
            target: "#idle"
          }
        }
      },
      loading: {
        ...loadingDef(fetchItems)
      },
      ok: { ...okDef() }
    }
  };
};

const loadingDef = function(fetchItems) {
  return {
    invoke: {
      src: ctx => fetchItems(ctx.inputValue),
      onDone: [
        {
          target: "ok",
          cond: (_ctx, evt) => {
            let items = evt.data.items;
            return items && items.length > 0;
          },
          actions: assign({ items: (_ctx, evt) => evt.data.items })
        },
        {
          target: "error",
          actions: assign({ errorMsg: "No Suggestions" })
        }
      ],
      onError: {
        target: "error",
        actions: assign({ errorMsg: "Request Error" })
      }
    }
  };
};

const okDef = function() {
  return {
    entry: assign({ cursorIndex: null }),
    on: {
      KEY_ENTER: "#idle",
      MOUSE_ENTERED_ITEM: {
        actions: assign({
          cursorIndex: (_ctx, evt) => evt.itemIndex
        })
      },
      MOUSE_LEAVED_LIST: {
        target: "cursor_off"
      },
      MOUSE_CLICKED_ITEM: {
        target: "#notTyping",
        actions: assign({
          cursorIndex: (_ctx, evt) => evt.itemIndex,
          inputValue: (ctx, evt) => {
            return ctx.items[evt.itemIndex];
          }
        })
      },
      KEY_ARROW_DOWN: {
        actions: assign(ctx => {
          let cursorIndex = (ctx.cursorIndex + 1) % ctx.items.length;
          return {
            ...ctx,
            cursorIndex,
            inputValue: ctx.items[cursorIndex]
          };
        })
      },
      KEY_ARROW_UP: {
        actions: assign(ctx => {
          let cursorIndex = (ctx.cursorIndex - 1) % ctx.items.length;
          return {
            ...ctx,
            cursorIndex,
            inputValue: ctx.items[cursorIndex]
          };
        })
      }
    }
  };
};
