import React, { useRef } from "react";
import ImportData from "../components/ImportData";

export default function ReimportDataPage() {
  function onImportDone() {
    console.log("ReimportDataPage");
  }

  return <ImportData onImportDone={onImportDone} />;
}
