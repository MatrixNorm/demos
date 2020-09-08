import * as React from "react";
import { createContext, useContext, useState } from "react";
import { Container } from "react-relay";
import styled from "styled-components";

export const ReloadContext = createContext(() => {});

const StyledReload = styled.div`
  text-align: center;
  .message {
    margin-bottom: 1em;
  }
`;

export function ReloadMessage({ message }: { message: string }) {
  const reload = useContext(ReloadContext);
  return (
    <StyledReload>
      <div className="message">{message}</div>
      <button onClick={reload} className="button">
        Reload
      </button>
    </StyledReload>
  );
}

export function ReloadWrapper({ children }: { children: any }) {
  const [, setState] = useState({});

  function dispatch() {
    setState({});
  }

  return <ReloadContext.Provider value={dispatch}>{children}</ReloadContext.Provider>;
}

// function wrap<Props>(fragmentContainer: Container<Props>) {
//   return function(props: any) {
//     return null;
//   };
// }
