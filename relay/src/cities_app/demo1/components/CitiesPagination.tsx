import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import styled from "styled-components";
import { NextButton, PrevButton } from "../elements/Buttons";
import CitySummary from "./CitySummary";
import { CitiesPagination_page } from "__relay__/CitiesPagination_page.graphql";

const CitiesList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Page = styled.div`
  display: inline-block;
  .controls-container {
    text-align: center;
  }
`;

interface Props {
  page: CitiesPagination_page;
  loadPrevPage: any;
  loadNextPage: any;
}

function CitiesPagination({ page, loadPrevPage, loadNextPage }: Props) {
  const { nodes, hasPrevPage, hasNextPage, pageNo } = page;
  return (
    <Page>
      <CitiesList>
        {nodes &&
          nodes.map(city => (
            <li key={city.id}>
              <CitySummary city={city} />
            </li>
          ))}
      </CitiesList>
      <div className="controls-container">
        <div className="controls">
          {hasPrevPage && <PrevButton onClick={() => loadPrevPage(page)} />}
          <span>{pageNo}</span>
          {hasNextPage && <NextButton onClick={() => loadNextPage(page)} />}
        </div>
      </div>
    </Page>
  );
}

export default createFragmentContainer(CitiesPagination, {
  page: graphql`
    fragment CitiesPagination_page on CitiesPagination {
      pageNo
      hasNextPage
      hasPrevPage
      nodes {
        id
        ...CitySummary_city
      }
    }
  `
});
