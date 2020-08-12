import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import ReactDOM from "react-dom";

const useWillMount = (cb) => {
  const pristine = useRef(true);
  pristine.current && cb();
  pristine.current = false;
};

function useEffectMountOnly(cb) {
  useEffect(cb, []);
}

function useEffectUpdateOnly(cb) {
  const isMounting = useRef(true);
  useEffect(() => {
    if (isMounting.current) {
      isMounting.current = false;
    } else {
      cb();
    }
  });
}

function App() {
  const [cat, setCat] = useState("Tiger");

  useWillMount(() => {
    console.log("useWillMount");
  });

  useEffectMountOnly(() => {
    console.log("useEffect on mount only");
  });

  useEffectUpdateOnly(() => {
    console.log("useEffect on update only");
  }, []);

  useLayoutEffect(() => {
    console.log("useLayoutEffect");
  });

  return (
    <div>
      <input
        type="text"
        value={cat}
        onChange={(e) => {
          console.log("<onChange>");
          setCat(e.target.value);
          console.log("</onChange>");
        }}
      />
      <div>{cat}</div>
    </div>
  );
}
const rootElement = document.getElementById("app");
ReactDOM.render(<App />, rootElement);
