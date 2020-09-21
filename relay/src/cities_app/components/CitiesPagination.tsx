import * as React from "react";
import { graphql, createFragmentContainer, RelayRefetchProp } from "react-relay";
import styled from "styled-components";
import { NextButton, PrevButton } from "../elements/Buttons";
import { LoadingContext, placeholderCssMixin } from "../verysmart/LoadingContext";
import CitySummary, { defaultData as cityDefaultData } from "./CitySummary";
import { CitiesPagination_page } from "__relay__/CitiesPagination_page.graphql";
import { NukeFragRef } from "../helpers/typeUtils";

const MAX_PAGE_SIZE = 10;

const CitiesList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    padding-bottom: 1em;
  }
`;

const PageSuccess = styled.div`
  .controls-container {
    text-align: center;
  }
  .pagesize-container {
    text-align: left;
  }
`;

const PageLoading = styled(PageSuccess)`
  ${placeholderCssMixin}
`;

interface Props {
  page: CitiesPagination_page;
  refetch: RelayRefetchProp["refetch"];
}

export default createFragmentContainer(
  ({ page, refetch }: Props) => {
    const { nodes, hasNext, hasPrev } = page;

    const loadNextPage = (currentPage: CitiesPagination_page) => {
      let { nodes } = currentPage;
      if (nodes && nodes.length > 0) {
        let after = nodes[nodes.length - 1].id;
        currentPage.hasNext &&
          refetch((prevVars) => {
            return { ...prevVars, after, before: null };
          });
      }
    };

    const loadPrevPage = (currentPage: CitiesPagination_page) => {
      let { nodes } = currentPage;
      if (nodes && nodes.length > 0) {
        let before = nodes[0].id;
        currentPage.hasPrev &&
          refetch((prevVars) => {
            return { ...prevVars, before, after: null };
          });
      }
    };

    const onPageSizeChange = (
      newPageSize: number,
      currentPage: CitiesPagination_page
    ) => {
      let { nodes } = currentPage;
      refetch((prevVars) => {
        return {
          ...prevVars,
          pageSize: newPageSize,
          after: nodes && nodes.length > 0 ? nodes[0].id : null,
          before: null,
        };
      });
    };

    const isLoading = React.useContext(LoadingContext);
    const Page = isLoading ? PageLoading : PageSuccess;

    return (
      <Page>
        <div className="pagesize-container">
          <span className="pagesize-input placeholder">
            <input
              type="number"
              value={page.pageSize}
              max={MAX_PAGE_SIZE}
              min="1"
              onChange={(e) => onPageSizeChange(Number(e.target.value), page)}
            />
          </span>
        </div>
        <CitiesList>
          {nodes &&
            nodes.map((city) => (
              <li key={city.id}>
                <CitySummary city={city} />
              </li>
            ))}
        </CitiesList>
        <div className="controls-container">
          <div className="controls">
            {hasPrev && <PrevButton onClick={() => loadPrevPage(page)} />}
            {hasNext && <NextButton onClick={() => loadNextPage(page)} />}
          </div>
        </div>
      </Page>
    );
  },
  {
    page: graphql`
      fragment CitiesPagination_page on CitiesPagination {
        pageSize
        hasNext
        hasPrev
        nodes {
          id
          ...CitySummary_city
        }
      }
    `,
  }
);

export const defaultData = {
  pageSize: 5,
  hasNext: false,
  hasPrev: false,
  nodes: [
    { ...cityDefaultData, id: "1" },
    { ...cityDefaultData, id: "2" },
    { ...cityDefaultData, id: "3" },
    { ...cityDefaultData, id: "4" },
    { ...cityDefaultData, id: "5" },
  ],
} as NukeFragRef<CitiesPagination_page>;
