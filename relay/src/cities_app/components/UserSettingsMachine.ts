/**
 * {
 *    srv: server state,
 *    mut: active mutation delta,
 *    mut2: queued mutation delta,
 *    loc: local draft delta
 * }
 */

function reducer(state, event) {
  if (state.mut === null) {
    return noMutReducer(state, event);
  } else if (state.mut2 === null) {
    return mutReducer(state, event);
  } else {
    return queMutReducer(state, event);
  }
}

function noMutReducer(state, event) {
  switch (event.type) {
    case "edit": {
      let { fieldName, value } = event.payload;
      if (value !== state.srv[fieldName]) {
        return { ...state, loc: { ...state.loc, fieldName: value } };
      }
      return state;
    }
    case "submit": {
      if (state.loc) {
        return [{ ...state, mut: state.loc, loc: null }, "startMutation"];
      }
      return state;
    }
    case "cancel":
      return { ...state, loc: null };
    default:
      return state;
  }
}

function mutReducer(state, event) {
  const optimistic = { ...state.srv, ...state.mut };
  switch (event.type) {
    case "edit": {
      let { fieldName, value } = event.payload;
      if (value !== optimistic[fieldName]) {
        state = { ...state, loc: { ...state.loc, fieldName: value } };
      }
      return state;
    }
    case "submit": {
      if (state.loc) {
        return { ...state, mut2: state.loc, loc: null };
      }
      return state;
    }
    case "cancel":
      return { ...state, loc: null };
    case "mutSucc": {
      let serverResponse = event.payload;
      if (state.loc) {
        let diff = state.loc;
        return;
      }
      return { srv: serverResponse, mut: null, mut2: null, loc: null };
    }
    default:
      return state;
  }
}

function mut2Reducer(state, event) {}
