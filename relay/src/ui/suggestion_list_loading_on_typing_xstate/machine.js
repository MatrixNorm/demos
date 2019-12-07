import { assign } from "xstate";

export const createSuggestionMachine = function({ fetchItems, isQueryValid }) {
  const initialContext = {
    inputValue: "",
    items: null,
    cursorIndex: null,
    errorMsg: null
  };
  return {
    id: "suggestionsMachine",
    context: initialContext,
    initial: "notTyping",
    states: {
      typing: {
        on: {
          TYPING: {
            target: "typing",
            actions: assign({
              inputValue: (_, evt) => {
                console.log(33333333);
                return evt.inputValue;
              }
            })
          }
        },
        after: {
          3000: "walk_around"
          // TODO: report bug
          // [
          //   {
          //     target: "notTyping.loading",
          //     cond: ctx => {
          //       return isQueryValid(ctx.inputValue);
          //     }
          //   },
          //   {
          //     target: "notTyping.bad.invalidQuery"
          //   }
          // ]
        }
      },
      walk_around: {
        on: {
          "": [
            {
              target: "notTyping.loading",
              cond: ctx => {
                return isQueryValid(ctx.inputValue);
              }
            },
            {
              target: "notTyping.bad.invalidQuery"
            }
          ]
        }
      },
      notTyping: {
        id: "notTyping",
        initial: "idle",
        on: {
          TYPING: {
            target: "typing",
            actions: assign({
              inputValue: (_, evt) => evt.inputValue
            })
          }
        },
        states: {
          idle: {},
          bad: { ...badStateDef() },
          loading: {
            ...loadingDef({ fetchItems })
          },
          requestOk: { ...requestOkDef() }
        }
      }
    }
  };
};

const badStateDef = function() {
  return {
    exit: {
      actions: assign({ errorMsg: null })
    },
    on: {
      INPUT_BLUR: {
        target: "idle"
      },
      DISMISS: {
        target: "idle"
      }
    },
    states: {
      invalidQuery: {},
      requestError: {},
      noItems: {}
    }
  };
};

const loadingDef = function({ fetchItems }) {
  return {
    invoke: {
      id: "getItems",
      src: ctx => fetchItems(ctx.inputValue),
      onDone: [
        {
          target: "requestOk",
          cond: (_ctx, evt) => {
            let items = evt.data.items;
            return items && items.length > 0;
          },
          actions: assign({ items: (_ctx, evt) => evt.data.items })
        },
        {
          target: "bad.noItems",
          actions: assign({ errorMsg: "No Suggestions" })
        }
      ],
      onError: {
        target: "bad.requestError",
        actions: assign({ errorMsg: "Request Error" })
      }
    }
  };
};

const requestOkDef = function() {
  return {
    exit: assign({ cursorIndex: null }),
    initial: "cursor_off",
    states: {
      cursor_off: {
        on: {
          MOUSE_ENTERED_ITEM: {
            target: "cursor_on",
            actions: assign({
              cursorIndex: (_ctx, evt) => evt.itemIndex
            })
          },
          KEY_ARROW_DOWN: {
            target: "cursor_on",
            actions: assign({
              cursorIndex: 0,
              inputValue: ctx => ctx.items[0]
            })
          },
          KEY_ARROW_UP: {
            target: "cursor_on",
            actions: assign({
              cursorIndex: ctx => ctx.items.length - 1,
              inputValue: ctx => ctx.items[ctx.items.length - 1]
            })
          }
        }
      },
      cursor_on: {
        on: {
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
                console.log(55555555);
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
      }
    }
  };
};
