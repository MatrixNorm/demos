// @flow
/* globals $ReadOnlyArray */

/*
  Generic pagination helper.
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

type Props = {
  connection: Connection,
  refetch: any
};

function goNext(connection, refetch) {
  refetch(
    {
      first: 3,
      after: connection.pageInfo.endCursor,
      last: null,
      before: null,
      orderBy: null
    },
    null
  );
}

function goPrev(connection, refetch) {
  refetch(
    {
      first: null,
      after: null,
      last: 3,
      before: connection.pageInfo.startCursor,
      orderBy: null
    },
    null
  );
}

export function pagination({ connection, refetch }: Props) {
  function handleNext() {
    goNext(connection, refetch);
  }

  function handlePrev() {
    goPrev(connection, refetch);
  }

  const nodes = connection.edges
    ? connection.edges
        .filter(Boolean)
        .map(edge => edge.node)
        .filter(Boolean)
    : [];

  const hasPrev = connection.pageInfo.hasPreviousPage;
  const hasNext = connection.pageInfo.hasNextPage;

  return { nodes, hasNext, hasPrev, handleNext, handlePrev };
}
