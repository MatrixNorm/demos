import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

export default function Fig() {
  const [show, setShow] = useState(true);
  const [btnActive, setBtnActive] = useState(false);
  return (
    <div className="fig1">
      {btnActive && (
        <button
          className="fig1__toggle-button"
          onClick={() => btnActive && setShow((show) => !show)}
        >
          {show ? "hide" : "show"}
        </button>
      )}
      <CSSTransition
        in={show}
        timeout={{ appear: 2000, enter: 2000, exit: 2000 }}
        classNames="fig1__animate-me-"
        appear={true}
        unmountOnExit={true}
        onEnter={() => {
          setBtnActive(false);
        }}
        onEntered={() => {
          setBtnActive(true);
        }}
        onExit={() => {
          setBtnActive(false);
        }}
        onExited={() => {
          setBtnActive(true);
        }}
      >
        <AnimateMe />
      </CSSTransition>
    </div>
  );
}

function AnimateMe() {
  useEffect(() => {
    console.log("mounted");
  }, []);
  return <div className="fig1__animate-me">Animate Me</div>;
}
