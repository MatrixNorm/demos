import { visit } from "graphql";

export function isQueryNotEmpty(queryAST) {
  let isNonEmpty = true;
  visit(queryAST, {
    enter(node) {
      if (
        node.kind === "OperationDefinition" &&
        node.operation === "query" &&
        node.selectionSet === null
      ) {
        isNonEmpty = false;
      }
    }
  });
  return isNonEmpty;
}
