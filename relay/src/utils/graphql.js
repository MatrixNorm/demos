import { visit } from "graphql";

export function isOperationNotEmpty(operationAST) {
  let isNonEmpty = true;
  visit(operationAST, {
    enter(node) {
      if (
        node.kind === "OperationDefinition" &&
        (node.operation === "query" || node.operation === "mutation") &&
        node.selectionSet === null
      ) {
        isNonEmpty = false;
      }
    }
  });
  return isNonEmpty;
}

export function cutClientPart(operationAST) {
  const clientFragments = [];

  let clientAST = visit(operationAST, {
    enter(node, key, parent) {
      if (
        node.kind === "SelectionSet" &&
        parent.kind === "OperationDefinition" &&
        (parent.operation === "query" || parent.operation === "mutation")
      ) {
        const nodeCopy = JSON.parse(JSON.stringify(node));
        const clientSelections = nodeCopy.selections.filter(selection => {
          return selection.directives.some(
            directive => directive.name.value === "local"
          );
        });
        if (clientSelections.length === 0) {
          return null;
        }

        visit(clientSelections, {
          enter(node) {
            if (node.kind === "FragmentSpread") {
              clientFragments.push(node.name.value);
            }
          }
        });

        nodeCopy.selections = clientSelections;
        return nodeCopy;
      }
    }
  });
  // remove non-local fragments from client query
  clientAST = visit(clientAST, {
    enter(node) {
      if (
        node.kind === "FragmentSpread" &&
        !clientFragments.includes(node.name.value)
      ) {
        return null;
      }
    }
  });

  return { clientAST, clientFragments };
}

export function cutRemotePart(operationAST, clientFragments) {
  const remoteAST = visit(operationAST, {
    enter(node, key, parent) {
      if (
        node.kind === "SelectionSet" &&
        parent.kind === "OperationDefinition" &&
        (parent.operation === "query" || parent.operation === "mutation")
      ) {
        const nodeCopy = JSON.parse(JSON.stringify(node));
        const serverSelections = nodeCopy.selections.filter(selection => {
          return !selection.directives.some(
            directive => directive.name.value === "local"
          );
        });
        if (serverSelections.length === 0) {
          return null;
        }
        nodeCopy.selections = serverSelections;
        return nodeCopy;
      }
      if (
        node.kind === "FragmentDefinition" &&
        clientFragments.includes(node.name.value)
      ) {
        return null;
      }
    }
  });
  return remoteAST;
}
