import React from "react";
import styled from "styled-components";
import CitiesPaginationParametersPanel from "./CitiesPaginationParametersPanel";
import CitiesPaginationListingPanel from "./CitiesPaginationListingPanel";

const WithStyle = styled.div`
  .main-page {
    display: flex;
  }

  .search-parameters-panel {
    width: 150px;
  }

  .pagination-panel {
    width: 350px;
  }
`;

export default function MainPage() {
  console.log("MainPage");
  return (
    <WithStyle>
      <div className="main-page">
        <div className="search-parameters-panel">
          <CitiesPaginationParametersPanel />
        </div>
        <div className="pagination-panel">
          <CitiesPaginationListingPanel />
        </div>
      </div>
    </WithStyle>
  );
}
