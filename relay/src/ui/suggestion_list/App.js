// @flow

import React, { useCallback, useRef, useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export default function App() {
  const inputEl = useRef(null);

  return (
    <>
      <input type="text" ref={inputEl} />
      <SuggestionList />
    </>
  );
}

function SuggestionList() {
  const [items] = useState(["Aa", "Bb", "Cc", "Dd", "Ee"]);
  const [selectedIdx, setSelectedIdx] = useState(null);

  const onSelectListItem = useCallback(index => {
    setSelectedIdx(index);
  }, []);
  console.log("render", selectedIdx);
  return (
    <div>
      <ul
        css={css`
          padding: 0;
          margin: 0;
        `}
      >
        {items.map((item, j) => (
          <SuggestionListItem
            key={j}
            index={j}
            onSelectListItem={onSelectListItem}
            text={item}
          />
        ))}
      </ul>
    </div>
  );
}

const SuggestionListItem = React.memo(function({
  index,
  text,
  onSelectListItem
}) {
  const [isHovered, setIsHovered] = useState(false);
  console.log(text, isHovered);
  const style = isHovered
    ? css`
        background-color: #dedcdc;
      `
    : css``;
  return (
    <li
      css={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectListItem(index)}
    >
      {text}
    </li>
  );
});
