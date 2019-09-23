import React, { useState } from "react";
import { useTickerData } from "./hooks";

export function Table({ children }) {
  return (
    <table cellSpacing={0}>
      <thead>
        <tr>
          <th style={{ width: 70 }}>ID</th>
          <th style={{ width: 50 }}>Price</th>
          <th style={{ width: 50 }}>Yield</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export function TableRow({ ticker }) {
  let { data, didChange } = useTickerData(ticker);
  let [isHighlighted, setIsHighlighted] = useState(false);

  if (!isHighlighted && didChange) {
    setIsHighlighted(true);
  }
  if (isHighlighted && !didChange) {
    setIsHighlighted(false);
  }

  let change = data.priceChange && (data.priceChange < 0 ? "down" : "up");

  return (
    <tr className={(isHighlighted && change) || ""}>
      <td>{data.ticker}</td>
      <td>{Number(Math.round(data.price + "e2") + "e-2").toFixed(2)}</td>
      <td>{Number(Math.round(data.yield + "e2") + "e-2").toFixed(2)}</td>
    </tr>
  );
}
