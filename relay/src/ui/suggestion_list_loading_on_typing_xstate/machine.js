import { Machine, assign } from "xstate";

export const suggestionMachineDef = {
  id: "suggestionMachine",
  context: {
    open: false,
    items: null,
    cursorIndex: null
  },
  initial: "idle",
  states: {
    idle: {
      on: {
        USER_ASKED_FOR_SUGGESTIONS: "working"
      }
    },
    working: {
      enter: [
        assign({
          open: true
        })
      ],
      exit: [
        assign({
          open: false,
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
    "items_load_done/happy_state": { ...happyStateDef }
  }
};

const happyStateDef = {
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
      target: "idle",
      actions: "action/setTextInput"
    },
    KEY_ARROW_DOWN: {
      actions: [
        assign({
          cursorIndex: ctx =>
            ctx.cursorIndex ? (ctx.cursorIndex + 1) % ctx.items.length : 0
        }),
        "action/setTextInput"
      ]
    },
    KEY_ARROW_UP: {
      actions: [
        assign({
          cursorIndex: ctx =>
            ctx.cursorIndex
              ? (ctx.cursorIndex - 1) % ctx.items.length
              : ctx.items.length - 1
        }),
        "action/setTextInput"
      ]
    }
  }
};
