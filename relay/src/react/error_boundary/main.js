import React, { useState } from "react";
import ReactDOM from "react-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  static getDerivedStateFromError(error) {
    return { error: true };
  }

  componentDidCatch(error) {
    console.log("ERROR: ", error);
  }

  render() {
    console.log(this.state);
    if (this.state.error) {
      return <div>ERROR</div>;
    }
    return this.props.children;
  }
}

function Foo() {
  console.log("Foo");
  return <Bar />;
}

function Bar() {
  const [name, setName] = useState("");
  console.log("Bar");
  if (name === "E") throw new Error();
  return (
    <div>
      <div>type E for error</div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}

// ReactDOM.render(
//   <ErrorBoundary>
//     <Foo />
//   </ErrorBoundary>,
//   document.getElementById("app")
// );

ReactDOM.render(<Foo />, document.getElementById("app2"));
