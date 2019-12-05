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

const loadDoneDef = {
  on: {
    INPUT_BLUR: "#idle",
    KEY_ENTER: "#idle"
  },
  initial: "entry",
  states: {
    entry: {
      on: {
        "": [
          {
            target: "error",
            cond: "isLoadingError"
          },
          {
            target: "empty_items_list",
            cond: "isItemsListEmpty"
          },
          {
            target: "happy",
            actions: assign({
              items: (_ctx, evt) => {
                console.log(111, _ctx, evt);
                return evt.payload;
              }
            })
          }
        ]
      }
    },
    error: {},
    empty_items_list: {},
    happy: { ...happyStateDef }
  }
};

export const suggestionMachineDef = {
  id: "suggestionMachine",
  context: {
    items: null,
    cursorIndex: null
  },
  initial: "idle",
  states: {
    idle: {
      id: "idle",
      on: {
        USER_ASKED_FOR_SUGGESTIONS: [
          { target: "loading", cond: "serchTermIsValid" },
          { target: "invalid" }
        ]
      }
    },
    invalid: {
      on: {
        USER_START_TYPING: "idle",
        INPUT_BLUR: "idle"
      }
    },
    loading: {
      on: {
        REQUEST_DONE: "loading_result",
        USER_START_TYPING: "idle"
      }
    },
    loading_result: { ...loadDoneDef }
  }
};
