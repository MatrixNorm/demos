function isQueryValid(query) {
  return query && query.trim().length > 0;
}

function clearInteraction(state) {
  return { ...state, fsm: null, suggestions: null, pointedIndex: null };
}

export default function reducer(stateAndCommand, action) {
  let stateAndMaybeCommand = _reducer(stateAndCommand[0], action);
  if (!Array.isArray(stateAndMaybeCommand)) {
    stateAndMaybeCommand = [stateAndMaybeCommand, null];
  }
  return stateAndMaybeCommand;
}

function _reducer(state, action) {
  if (action.type === "TYPING") {
    return clearInteraction({
      ...state,
      inputValue: action.inputValue
    });
  }
  if (action.type === "STOP_TYPING") {
    let query = state.inputValue;
    let fsmId = 1 * new Date();
    if (isQueryValid(query)) {
      return [
        { ...state, fsm: { id: fsmId, state: "loading" } },
        { type: "LOAD_SUGGESTIONS", query }
      ];
    } else {
      return {
        ...state,
        fsm: { id: fsmId, state: "error" },
        errorMsg: "Bad query"
      };
    }
  }
  let localReducer = fsmReducers[(state.fsm?.state)];
  if (localReducer) {
    return localReducer(state, action) || state;
  }
  return state;
}

const fsmReducers = {
  loading: (state, action) => {
    switch (action.type) {
      case "LOAD_ERROR":
        return {
          ...state,
          fsm: { ...state.fsm, state: "error" },
          errorMsg: "Loading suggestions error"
        };
      case "LOAD_OK":
        return {
          ...state,
          fsm: { ...state.fsm, state: "ok" },
          suggestions: action.suggestions
        };
    }
  },
  error: (state, action) => {
    switch (action.type) {
      case "DISMISS_ERROR_MESSAGE":
        return clearInteraction(state);
    }
  },
  ok: (state, action) => {
    switch (action.type) {
      //case "INPUT_BLUR":
      case "INPUT_ENTER":
      case "INPUT_ESCAPE":
        return clearInteraction(state);
      case "INPUT_ARROW_DOWN": {
        let pointedIndex =
          state.pointedIndex !== null
            ? (state.pointedIndex + 1) % state.suggestions.length
            : 0;
        return {
          ...state,
          pointedIndex,
          inputValue: state.suggestions[pointedIndex]
        };
      }
      case "INPUT_ARROW_UP": {
        let len = state.suggestions.length;
        let pointedIndex =
          state.pointedIndex !== null
            ? (state.pointedIndex - 1 + len) % len
            : len - 1;
        return {
          ...state,
          pointedIndex,
          inputValue: state.suggestions[pointedIndex]
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
        return clearInteraction({
          ...state,
          inputValue: action.itemText
        });
    }
  }
};
