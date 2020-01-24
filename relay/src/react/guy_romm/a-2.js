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
/*
  Problem: code dublication.
*/
function TableWithBorder(props) {
  return (
    <WithBorder initialColor={props.initialBorderColor}>
      <Table content={props.content} />
    </WithBorder>
  );
}

function InputWithBorder(props) {
  return (
    <WithBorder initialColor={props.initialBorderColor}>
      <Input value={props.value} />
    </WithBorder>
  );
}

export function MainView({ initialBorderColor }) {
  return (
    <div>
      <TableWithBorder
        content="this is table"
        initialBorderColor={initialBorderColor}
      />
      <br />
      <br />
      <InputWithBorder value={3.14} initialBorderColor={initialBorderColor} />
    </div>
  );
}
