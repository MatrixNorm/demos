import { useCallback, useEffect, useReducer } from "react";

export default function useMyReducer(
  reducer,
  initialState,
  { fetchSuggestions }
) {
  const [[state, command], dispatch] = useReducer(reducer, [
    initialState,
    null
  ]);

  const commandInterpreter = useCallback(function(command, dispatch) {
    if (command) {
      switch (command.type) {
        case "LOAD_SUGGESTIONS": {
          (function() {
            let fsmId = state.fsm.id;
            fetchSuggestions({ query: command.query })
              .then(
                data =>
                  state.fsm &&
                  fsmId === state.fsm.id &&
                  dispatch({
                    type: "LOAD_OK",
                    suggestions: data.suggestions
                  })
              )
              .catch(
                error =>
                  state.fsm &&
                  fsmId === state.fsm.id &&
                  dispatch({ type: "LOAD_ERROR", error })
              );
          })();
        }
      }
    }
  });

  useEffect(() => {
    commandInterpreter(command, dispatch);
  });

  return [state, dispatch];
}
