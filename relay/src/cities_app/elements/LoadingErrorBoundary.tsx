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

export function Reload({ message, onClick }: { message: string; onClick: () => void }) {
  return (
    <StyledReload>
      <div className="message">{message}</div>
      <button onClick={onClick} className="button">
        Reload
      </button>
    </StyledReload>
  );
}

export function withReaload(Component: any) {
  return function(props: any) {
    const [reload, setReload] = useState(false);
    if (reload) {
      return <Reload message="something went wrong" onClick={() => setReload(false)} />;
    }
    try {
      const reactElementOrNull = <Component {...props} />;
      if (reactElementOrNull) {
        return reactElementOrNull;
      }
      setReload(true);
    } catch (err) {
      setReload(true);
    }
    return null;
  };
}

export class LoadingErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { error: false };
  }

  componentDidCatch(error: any) {
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <Reload
          message="something went wrong"
          onClick={() =>
            this.setState({
              error: false,
            })
          }
        />
      );
    }
    return this.props.children;
  }
}
