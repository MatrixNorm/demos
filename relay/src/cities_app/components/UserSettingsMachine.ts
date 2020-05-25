/**
 * {
 *    srv: server state,
 *    muta: active mutation delta,
 *    mutq: queued mutation delta,
 *    loc: local draft delta
 * }
 */

function abc(state, event) {
  if (state.muta === null) {
    return noMutReducer(state, event);
  } else if (state.mutq === null) {
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
        state = { ...state, loc: { ...state.loc, fieldName: value } };
      }
      return state;
    }
    case "submit":
      // code block
      break;
    case "cancel":
      // code block
      break;
    default:
    // code block
  }
}

function mutReducer(state, event) {}

function queMutReducer(state, event) {}
