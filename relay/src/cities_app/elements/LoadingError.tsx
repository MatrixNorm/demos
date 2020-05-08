import * as React from "react";
import { useState } from "react";
import styled from "styled-components";

export default function LoadingError() {
  return <h3>Something went wrong</h3>;
}

const StyledReload = styled.div`
  text-align: center;
  .message {
    margin-bottom: 1em;
  }
`;

export function Reload({
  message,
  onClick,
}: {
  message: string;
  onClick: () => void;
}) {
  return (
    <StyledReload>
      <div className="message">{message}</div>
      <button onClick={onClick} className="button">
        Reload
      </button>
    </StyledReload>
  );
}

export function withReaload(Component) {
  return function(props) {
    const [reload, setReload] = useState(false);
    if (reload) {
      return (
        <Reload
          message="something went wrong"
          onClick={() => setReload(false)}
        />
      );
    }
    try {
      const reactElement = <Component {...props} />;
      if (reactElement) {
        return reactElement;
      }
      setReload(true);
    } catch {
      setReload(true);
    }
  };
}
