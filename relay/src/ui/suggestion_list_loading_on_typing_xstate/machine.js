import { assign } from "xstate";

export const machineDef = () => ({
  id: "suggestionMachine",
  context: {
    inputValue: "",
    items: null,
    pointedIndex: null,
    errorMsg: null
  },
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
        TYPING_DEBOUNCE_DELAY: { target: "uglyfix" }
        // https://github.com/davidkpiano/xstate/issues/886
        // [
        //   {
        //     target: "working",
        //     cond: ctx => ctx.inputValue && ctx.inputValue.trim().length !== 0
        //   },
        //   { target: "idle" }
        // ]
      }
    },
    uglyfix: {
      on: {
        "": [
          {
            target: "idle",
            cond: ctx => ctx.inputValue.trim().length === 0
          },
          { target: "working" }
        ]
      }
    },
    working: {
      on: {
        TYPING: "typing"
      },
      ...workingSubmachineDef()
    }
  }
});

const workingSubmachineDef = () => ({
  initial: "entry",
  states: {
    entry: {
      on: {
        "": [
          {
            target: "loading",
            cond: "isQueryValid"
          },
          {
            target: "error",
            actions: assign({ errorMsg: "Invalid query" })
          }
        ]
      }
    },
    error: {
      on: {
        DISMISS_MESSAGE: "#idle",
        INPUT_ESCAPE: "#idle"
      },
      exit: assign({ errorMsg: null })
    },
    loading: { ...loadingDef() },
    ok: { ...okDef() }
  }
});

const loadingDef = () => ({
  invoke: {
    src: "fetchService",
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
});

const okDef = () => ({
  entry: assign({ pointedIndex: null }),
  on: {
    INPUT_ENTER: "#idle",
    INPUT_ESCAPE: "#idle",
    MOUSE_ENTERED_ITEM: {
      actions: assign({
        pointedIndex: (_ctx, evt) => evt.itemIndex
      })
    },
    MOUSE_LEAVED_LIST: {
      actions: assign({ pointedIndex: null })
    },
    MOUSE_CLICKED_ITEM: {
      target: "#idle",
      actions: assign({
        inputValue: (_, evt) => evt.itemText
      })
    },
    INPUT_ARROW_DOWN: {
      actions: assign(ctx => {
        let pointedIndex =
          ctx.pointedIndex !== null
            ? (ctx.pointedIndex + 1) % ctx.items.length
            : 0;
        return {
          ...ctx,
          pointedIndex,
          inputValue: ctx.items[pointedIndex]
        };
      })
    },
    INPUT_ARROW_UP: {
      actions: assign(ctx => {
        let len = ctx.items.length;
        let pointedIndex =
          ctx.pointedIndex !== null
            ? (ctx.pointedIndex - 1 + len) % len
            : len - 1;
        return {
          ...ctx,
          pointedIndex,
          inputValue: ctx.items[pointedIndex]
        };
      })
    }
  }
});
