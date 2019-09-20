// @flow
/* globals $ReadOnlyArray */

/*
  Generic pagination hook.
*/

type Connection = {
 +pageInfo: PageInfo,
 +edges: $ReadOnlyArray<?PostEdge>,
}

type PageInfo = {
  +hasNextPage: boolean,
  +hasPreviousPage: boolean,
  +startCursor?: ?string,
  +endCursor?: ?string,
 }

type PostEdge = {
 +node?: ?any,
 cursor: string,
}

type Props = {
  items: ?Connection,
  refetch: any,
}

function goNext(items, refetch) {
  if ( items ) {
    refetch(
      {
        first: 3,
        after: items.pageInfo.endCursor,
        last: null,
        before: null,
        orderBy: null,
      },
      null,
      () => console.log('next done!'))
  }
}

function goPrev(items, refetch) {
  if ( items ) {
    refetch(
      {
        first: null,
        after: null,
        last: 3,
        before: items.pageInfo.startCursor,
        orderBy: null,
      },
      null,
      () => console.log('prev done!'))
  }
}

// rename items to connection
export function usePagination({items, refetch}: Props) {

  function handleNext() {
    goNext(items, refetch)
  }

  function handlePrev() {
    goPrev(items, refetch)
  }

  const nodes = 
    items && items.edges
      ? items.edges
          .filter(Boolean)
          .map(edge => edge.node)
          .filter(Boolean)
      : [];

  const hasPrev = items?.pageInfo.hasPreviousPage
  const hasNext = items?.pageInfo.hasNextPage

  return { nodes, hasNext, hasPrev, handleNext, handlePrev }
}
