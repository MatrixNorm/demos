import React from "react";

function PiComponent({ pi, precision }) {
  return (
    <h1>
      Pi is {pi} with precision of {precision || "???"}
    </h1>
  );
}

export default PiComponent;
