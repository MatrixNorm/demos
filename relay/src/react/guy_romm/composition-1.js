import React, { useState } from "react";
import { Table, Input } from "./vendor";
import { getRandomColorStyleValue } from "./utils.js";

function WithBorder({ children, initialColor }) {
  const [color, setColor] = useState(initialColor);

  const onMouseEnter = () => {
    setColor(getRandomColorStyleValue());
  };
  const onMouseLeave = () => {
    setColor(initialColor);
  };

  return (
    <div
      style={{ borderWidth: "3px", borderStyle: "solid", borderColor: color }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}

export function MainView({ initialBorderColor }) {
  return (
    <div>
      <WithBorder initialColor={initialBorderColor}>
        <Table content="this is table" />
      </WithBorder>
      <br />
      <br />
      <WithBorder initialColor={initialBorderColor}>
        <Input value={3.14} />
      </WithBorder>
    </div>
  );
}

