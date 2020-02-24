```javascript
type OperationDescriptor = {
  fragment: SingularReaderSelector {
    kind: 'SingularReaderSelector',
    dataID: DataID,
    node: ReaderFragment,
    owner: RequestDescriptor {
      identifier: RequestIdentifier, // query string
      node: ConcreteRequest,
      variables: Variables,
    },
    variables: Variables,
  },
  request: RequestDescriptor, // query AST
  root: NormalizationSelector {
    dataID: DataID,
    node: NormalizationSelectableNode,
    variables: Variables,
  }
}

fragment.owner === request
fragment.node === request.node.fragment

type ConcreteRequest = {
  kind: 'Request',
  fragment: ReaderFragment,
  operation: NormalizationOperation {
    kind: 'Operation',
    name: string,
    argumentDefinitions: $ReadOnlyArray<NormalizationLocalArgumentDefinition>,
    selections: $ReadOnlyArray<NormalizationSelection>,
  },
  params: RequestParameters,
}
```
