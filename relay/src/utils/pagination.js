export function paginate(array, { after, first, before, last }) {
  if (first) {
    return _paginate_forwards({ array, first, after });
  }
  if (last && before) {
    return _paginate_backwards({ array, last, before });
  }
  throw "cannot paginate";
}

export function _paginate_forwards({ array, first, after }) {
  const startIndex = after ? array.findIndex(city => city.id === after) : 0;
  const endIndex = startIndex + first;
  const nodes = array.slice(startIndex, endIndex);
  const edges = nodes.map(node => ({
    node,
    cursor: node.id
  }));
  return {
    edges,
    pageInfo: {
      hasNextPage: endIndex < array.length,
      hasPreviousPage: startIndex > 0,
      startCursor: nodes[0]?.id,
      endCursor: nodes[nodes.length - 1]?.id
    }
  };
}

export function _paginate_backwards({ array, last, before }) {
  const endIndex = array.findIndex(city => city.id === before);
}
