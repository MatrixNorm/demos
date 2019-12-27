import React from "react";
import styled from "styled-components";

export const WithStyle = styled.div`
  .box {
    display: flex;
    justify-content: space-between;
    width: 200px;
    height: 30px;
  }

  .input {
    padding: 0;
    height: calc(100% - 4px);
    width: 45%;
  }
`;

export function RangeSlider() {
  return (
    <div className="box">
      <input type="text" className="input" />
      <input type="text" className="input" />
    </div>
  );
}
