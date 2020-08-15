import React, { useState, useEffect } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

export default function Fig() {
  const [route, setRoute] = useState("A");
  return (
    <div className="fig2">
      <button
        className="fig2__toggle-button"
        onClick={() => setRoute((route) => (route === "A" ? "B" : "A"))}
      >
        change route
      </button>
      <SwitchTransition>
        <CSSTransition
          key={route}
          timeout={1000}
          classNames="fig2__animate-me-"
          unmountOnExit={true}
        >
          <AnimateMe route={route} />
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

function AnimateMe({ route }) {
  return <div className="fig2__animate-me">{route}</div>;
}
