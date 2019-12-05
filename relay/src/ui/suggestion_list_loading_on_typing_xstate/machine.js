import { assign } from "xstate";

const happyStateDef = {
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

export const suggestionMachineDef = {
  id: "suggestionMachine",
  context: {
    inputValue: "",
    items: null,
    cursorIndex: null
  },
  initial: "notTyping",
  states: {
    notTyping: {
      id: "notTyping",
      initial: "idle",
      on: {
        TYPING: "typing"
      },
      states: {
        idle: {
          id: "#idle"
        },
        loading: {},
        blurable: {
          on: {
            BLUR: { target: "#idle" }
          },
          states: {
            dismissable: {
              states: {
                invalidInput: {},
                loadingError: {},
                emptyList: {}
              }
            },
            happyLoading: { ...happyStateDef }
          }
        }
      }
    },
    typing: {
      on: {
        TYPING_STOPS: [
          {
            target: "#invalidInput",
            cond: "isInputInvalid"
          },
          {
            target: "#loading"
          }
        ]
      }
    }
  }
};
