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

const PaginationControls = styled.section``;

interface Props {
  page: CitiesPagination_page;
  loadPrevPage: any;
  loadNextPage: any;
}

function CitiesPagination({ page, loadPrevPage, loadNextPage }: Props) {
  const { nodes, hasPrevPage, hasNextPage, pageNo } = page;
  return (
    <div>
      <CitiesList>
        {nodes &&
          nodes.map(city => (
            <li key={city.id}>
              <CitySummary city={city} />
            </li>
          ))}
      </CitiesList>
      <PaginationControls>
        {hasPrevPage && <PrevButton onClick={() => loadNextPage(page)} />}
        <span>{pageNo}</span>
        {hasNextPage && <NextButton onClick={() => loadNextPage(page)} />}
      </PaginationControls>
    </div>
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
