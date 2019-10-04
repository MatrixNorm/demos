// @flow
/* globals $ReadOnlyArray */

/*
  Generic pagination component.
*/

type Connection = {
  +pageInfo: PageInfo,
  +edges: $ReadOnlyArray<?Edge>
};

type PageInfo = {
  +hasNextPage: boolean,
  +hasPreviousPage: boolean,
  +startCursor: ?string,
  +endCursor: ?string
};

type Edge = {
  +node: Object,
  +cursor: string
};

type RefetchVariables = {
  first?: ?number,
  after?: ?string,
  last?: ?number,
  before?: ?string,
};


type Props = {
  items: ?Connection,
  refetch: (RefetchVariables) => void,
  renderCallback: any
};

function goNext(items, refetch) {
  if (items) {
    refetch(
      {
        first: 3,
        after: items.pageInfo.endCursor,
        last: null,
        before: null,
        orderBy: null
      },
      null,
      () => console.log("next done!")
    );
  }
}

function goPrev(items, refetch) {
  if (items) {
    refetch(
      {
        first: null,
        after: null,
        last: 3,
        before: items.pageInfo.startCursor,
        orderBy: null
      },
      null,
      () => console.log("prev done!")
    );
  }
}

// rename items to connection
const Pagination = ({ items, refetch, renderCallback }: Props) => {
  function handleNext() {
    goNext(items, refetch);
  }

  function handlePrev() {
    goPrev(items, refetch);
  }

  const nodes =
    items && items.edges
      ? items.edges
          .filter(Boolean)
          .map(edge => edge.node)
          .filter(Boolean)
      : [];

  const hasPrev = items?.pageInfo.hasPreviousPage;
  const hasNext = items?.pageInfo.hasNextPage;

  return renderCallback({ nodes, hasNext, hasPrev, handleNext, handlePrev });
};

export default Pagination;
