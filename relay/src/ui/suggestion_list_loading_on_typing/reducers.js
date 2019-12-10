function isQueryValid(query) {
  return query && query.trim().length > 0;
}

export default function reducer(state, action) {
  if (action.type === "TYPING") {
    return {
      ...state,
      fsmState: "idle",
      inputValue: action.payload.inputValue
    };
  }
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
        return [
          { ...state, fsmState: "loading" },
          { cmd: "LOAD_SUGGESTIONS", query }
        ];
      } else {
        return { ...state, fsmState: "error", errorMsg: "Bad query" };
      }
    }
  },
  loading: (state, action) => {
    switch (action.type) {
      case "LOAD_ERROR":
        return { ...state, fsmState: "error", errorMsg: "Loading query" };
      case "LOAD_OK":
        return {
          ...state,
          fsmState: "ok",
          suggestions: action.suggestions
        };
    }
  },
  error: (state, action) => {
    switch (action.type) {
      case "DISMISS_ERROR_MESSAGE":
        return { ...state, fsmState: "idle" };
    }
  },
  ok: (state, action) => {
    switch (action.type) {
      case "INPUT_ENTER":
      case "INPUT_BLUR":
        return { ...state, fsmState: "idle" };
      case "INPUT_ARROW_DOWN": {
        let pointedIndex = state.pointedIndex
          ? (state.pointedIndex + 1) % state.suggestion.length
          : 0;
        return {
          ...state,
          pointedIndex,
          inputValue: state.suggestion[pointedIndex]
        };
      }
      case "INPUT_ARROW_UP": {
        let pointedIndex = state.pointedIndex
          ? (state.pointedIndex - 1) % state.suggestion.length
          : state.suggestion.length - 1;
        return {
          ...state,
          pointedIndex,
          inputValue: state.suggestion[pointedIndex]
        };
      }
      case "MOUSE_ENTER_ITEM":
        return {
          ...state,
          pointedIndex: action.itemIndex
        };
      case "MOUSE_LEAVE_ITEMS":
        return {
          ...state,
          pointedIndex: null
        };
      case "MOUSE_CLICK_ITEM":
        return {
          ...state,
          fsmState: "idle",
          inputValue: state.suggestion[action.itemIndex]
        };
    }
  }
};
