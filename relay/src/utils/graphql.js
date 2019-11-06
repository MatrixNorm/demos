

export function isQueryNotEmpty(queryAST) {
  return queryAST.definitions.some(def => def.selectionSet.selections.length !== 0)
}