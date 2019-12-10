export default function reducer(state, action) {
  let localReducer = fsmReducers[state.fsmState];
  if (localReducer) {
    return localReducer(state, action) || state;
  }
  return state;
}

const fsmReducers = {
  idle: (state, action) => {
    if (action.type === "STOP_TYPING") {
      let { query } = action.payload;
      if (isQueryValid(query)) {
        return [{ ...state, fsmState: "loading" }, "CMD.LOAD_SUGGESTIONS"];
      } else {
        return { ...state, fsmState: "error", errorMsg: "Bad query" };
      }
    }
  },
  loading: (state, action) => {
    switch (action.type) {
      case "START_TYPING":
        return { ...state, fsmState: "idle" };
      case "LOAD_ERROR":
        return { ...state, fsmState: "error", errorMsg: "Loading query" };
      case "LOAD_OK":
        return { ...state, fsmState: "ok", items: action.payload.items };
    }
  },
  error: (state, action) => {
    switch (action.type) {
      case "START_TYPING":
      case "DISMISS_ERROR_MESSAGE":
        return { ...state, fsmState: "idle" };
    }
  },
  ok: (state, action) => {
    switch (action.type) {
      case "START_TYPING":
        return { ...state, fsmState: "idle" };
      case "LOAD_ERROR":
        return { ...state, fsmState: "error", errorMsg: "Loading query" };
      case "LOAD_OK":
        return { ...state, fsmState: "ok", items: action.payload.items };
    }
  }
};
