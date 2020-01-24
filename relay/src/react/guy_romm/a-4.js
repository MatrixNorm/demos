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

  return children({ color, onMouseEnter, onMouseLeave });
}

const StatelessWithBorder = props => (
  <div
    style={{
      borderWidth: "3px",
      borderStyle: "solid",
      borderColor: props.color
    }}
    onMouseEnter={props.onMouseEnter}
    onMouseLeave={props.onMouseLeave}
  >
    {props.children}
  </div>
);

export function MainView({ initialBorderColor }) {
  return (
    <div>
      <WithBorder initialColor={initialBorderColor}>
        {props => (
          <StatelessWithBorder {...props}>
            <Table content="this is table" />
          </StatelessWithBorder>
        )}
      </WithBorder>
      <br />
      <br />
      <WithBorder initialColor={initialBorderColor}>
        {props => (
          <StatelessWithBorder {...props}>
            <Input value={3.14} />
          </StatelessWithBorder>
        )}
      </WithBorder>
    </div>
  );
}
