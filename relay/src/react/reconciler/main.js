import React, { useState, useEffect, useLayoutEffect } from "react";
import ReactDOM from "react-dom";

function App() {
  const [power, setPower] = useState(2);
  return (
    <>
      <input
        type="number"
        step={0.01}
        value={power}
        onChange={(e) => setPower(e.target.value)}
      />
      <NumberList power={power} />
    </>
  );
}

function NumberList({ power }) {
  const [numbers, setNumbers] = useState([1.01, 1.02, 1.03]);

  useEffect(() => {
    console.log("useEffect mount");
  }, []);

  useEffect(() => {
    console.log("useEffect update");
  });

  useLayoutEffect(() => {
    console.log("useLayoutEffect mount");
  }, []);

  useLayoutEffect(() => {
    console.log("useLayoutEffect update");
  });

  return (
    <>
      <button
        onClick={() => {
          setNumbers((numbers) => {
            return numbers.map((x) => Math.pow(x, power));
          });
        }}
      >
        ^{power}
      </button>
      <ul>
        {numbers.map((number, i) => (
          <li key={i}>
            <Item number={number} />
          </li>
        ))}
      </ul>
    </>
  );
}

function Item({ number }) {
  return <div>{number}</div>;
}

const rootElement = document.getElementById("app");
ReactDOM.render(<App />, rootElement);
