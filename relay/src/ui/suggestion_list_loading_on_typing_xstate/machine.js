import { assign } from "xstate";

const happyStateDef = {
  initial: "happy/cursor_off",
  states: {
    "happy/cursor_off": {
      on: {
        MOUSE_ENTERED_ITEM: {
          target: "happy/cursor_on",
          actions: assign({
            cursorIndex: (_ctx, evt) => evt.itemIndex
          })
        },
        KEY_ARROW_DOWN: {
          target: "happy/cursor_on",
          actions: [
            assign({
              cursorIndex: 0
            }),
            "setTextInput"
          ]
        },
        KEY_ARROW_UP: {
          target: "happy/cursor_on",
          actions: [
            assign({
              cursorIndex: ctx => ctx.items.length - 1
            }),
            "setTextInput"
          ]
        }
      }
    },
    "happy/cursor_on": {
      on: {
        MOUSE_ENTERED_ITEM: {
          actions: assign({
            cursorIndex: (_ctx, evt) => evt.itemIndex
          })
        },
        MOUSE_LEAVED_LIST: {
          target: "happy/cursor_off"
        },
        MOUSE_CLICKED_ITEM: {
          target: "idle",
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
    INPUT_BLUR: "idle",
    KEY_ENTER: "idle"
  },
  initial: "items_load_done/entry",
  states: {
    "items_load_done/entry": {
      on: {
        "": [
          {
            target: "items_load_done/error",
            cond: "items_load_done/isError"
          },
          {
            target: "items_load_done/empty_items_list",
            cond: "items_load_done/isEmpty"
          },
          { target: "items_load_done/happy" }
        ]
      }
    },
    "items_load_done/error": {},
    "items_load_done/empty_items_list": {},
    "items_load_done/happy": { ...happyStateDef }
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
      on: {
        USER_ASKED_FOR_SUGGESTIONS: [
          { target: "working", cond: "serchTermIsValid" },
          { target: "invalid" }
        ]
      }
    },
    invalid: {
      on: {
        USER_RESUMED_TYPING: "idle",
        INPUT_BLUR: "idle"
      }
    },
    working: {
      exit: [
        assign({
          items: null,
          cursorIndex: null
        })
      ],
      on: {
        USER_RESUMED_TYPING: "idle"
      },
      initial: "loading_items",
      states: {
        loading_items: {
          on: {
            REQUEST_DONE: "items_load_done"
          }
        },
        items_load_done: { ...loadDoneDef }
      }
    }
  }
};
