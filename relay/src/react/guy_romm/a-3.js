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
 Problem: props name collision.
*/
const withBorderHOC = InnerComponent => props => {
  return (
    <WithBorder initialColor={props.initialBorderColor}>
      <InnerComponent {...props} />
    </WithBorder>
  );
};

const TableWithBorder = withBorderHOC(Table);
const InputWithBorder = withBorderHOC(Input);

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
