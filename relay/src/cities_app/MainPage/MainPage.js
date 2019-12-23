import React from "react";
import ParametersPanel from "./ParametersPanel";
import PaginationPanel from "./PaginationPanel";

export default function MainPage() {
  return (
    <div>
      <div>
        <ParametersPanel />
      </div>
      <div>
        <PaginationPanel />
      </div>
    </div>
  );
}
