import { useMemo, useEffect, useReducer } from "react";
import { createCommandInterpreter } from "./command";

export default function useMyReducer(reducer, initialState, { commandConfig }) {
  const [[state, command], dispatch] = useReducer(reducer, [
    initialState,
    null
  ]);

  const commandInterpreter = useMemo(() => {
    return createCommandInterpreter(commandConfig)(dispatch);
  }, []);

  useEffect(() => {
    command && commandInterpreter(command);
  });

  return [state, dispatch];
}
