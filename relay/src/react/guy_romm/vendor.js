import React from "react";

export function Table({ content }) {
  return (
    <div style={{ width: "200px", height: "300px", background: "silver" }}>
      {content}
    </div>
  );
}

export function Input({ value }) {
  return <input type="text" value={value} onChange={()=> {}} />;
}
