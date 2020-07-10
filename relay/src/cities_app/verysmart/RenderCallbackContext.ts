import { createContext } from "react";

type ContextValue = {
  [key: string]: (args: any) => JSX.Element;
};

export default createContext<ContextValue>({});
