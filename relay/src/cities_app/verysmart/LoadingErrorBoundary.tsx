import * as React from "react";
import styled from "styled-components";

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

export class LoadingErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { error: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { error: true };
  }

  componentDidCatch(error: any) {
    console.log("ERROR: ", error);
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
