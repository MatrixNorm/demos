import { Machine, assign } from "xstate";

export const suggestionMachine = Machine({
  id: "suggestionMachine",
  context: {
    open: false,
    items: null,
    selectedSuggestion: null,
    cursorIndex: null
  },
  initial: "closed",
  states: {
    closed: {
      on: {
        USER_ASKED_FOR_SUGGESTIONS: "open"
      }
    },
    open: {
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
        INPUT_BLUR: "closed",
        USER_RESUMED_TYPING: "closed"
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
              target: "closed",
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
                    : ctx.items.length - 1
              })
            },
            KEY_ENTER: {
              target: "closed"
            }
          }
        }
      }
    }
  }
});
