import { assign } from "xstate";

const requestOkDef = {
  exit: assign({ items: null, cursorIndex: null }),
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
          actions: [
            assign({
              cursorIndex: 0
            }),
            "setTextInput"
          ]
        },
        KEY_ARROW_UP: {
          target: "cursor_on",
          actions: [
            assign({
              cursorIndex: ctx => ctx.items.length - 1
            }),
            "setTextInput"
          ]
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
          target: "#idle",
          actions: [
            assign({
              cursorIndex: (_ctx, evt) => evt.itemIndex
            }),
            "setTextInput"
          ]
        },
        KEY_ARROW_DOWN: {
          actions: [
            assign({
              cursorIndex: ctx => (ctx.cursorIndex + 1) % ctx.items.length
            }),
            "setTextInput"
          ]
        },
        KEY_ARROW_UP: {
          actions: [
            assign({
              cursorIndex: ctx => (ctx.cursorIndex - 1) % ctx.items.length
            }),
            "setTextInput"
          ]
        }
      }
    }
  }
};

export const createSuggestionMachine = function({
  fetchSuggestions,
  isQueryValid
}) {
  const initialContext = {
    inputValue: "",
    items: null,
    cursorIndex: null,
    errorMsg: null
  };

  return {
    id: "suggestionMachine",
    context: initialContext,
    initial: "notTyping",
    states: {
      typing: {
        on: {
          TYPING_STOP: [
            { target: "notTyping.loading", cond: isQueryValid },
            {
              target: "invalidQuery"
            }
          ]
        }
      },
      notTyping: {
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
          idle: {
            id: "#idle"
          },
          bad: {
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
              requestEmpty: {}
            }
          },
          loading: {
            invoke: {
              id: "getSuggestions",
              src: ctx => fetchSuggestions(ctx.inputValue),
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
                  target: "bad.requestEmpty",
                  actions: assign({ errorMsg: "No Suggestions" })
                }
              ],
              onError: {
                target: "bad.requestError",
                actions: assign({ errorMsg: "Request Error" })
              }
            }
          },
          requestOk: { ...requestOkDef }
        }
      }
    }
  };
};
