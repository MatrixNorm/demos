import React from "react";
//import { QueryRenderer, graphql } from "react-relay";
//import styled from "styled-components";
//import environment from "theapp/env";
import CitiesPaginationParametersPanel from "./CitiesPaginationParametersPanel";
import CitiesPaginationListingPanel from "./CitiesPaginationListingPanel";

// const WithStyle = styled.div`
//   .main-page {
//     display: flex;
//   }
// `;

export default function MainPage() {
  console.log("MainPage");
  return (
    <div>
      <CitiesPaginationParametersPanel />
      <CitiesPaginationListingPanel />
    </div>
  );
}
