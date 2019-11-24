/**
 * @flow
 * @relayHash a6be9eb0bf687f8e6532c5a9db06a749
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AutoCompleteRefetchQueryVariables = {|
  query: string
|};
export type AutoCompleteRefetchQueryResponse = {|
  +viewer: {|
    +searchCountries: ?$ReadOnlyArray<string>
  |}
|};
export type AutoCompleteRefetchQuery = {|
  variables: AutoCompleteRefetchQueryVariables,
  response: AutoCompleteRefetchQueryResponse,
|};
*/


/*
query AutoCompleteRefetchQuery(
  $query: String!
) {
  viewer {
    searchCountries(query: $query, limit: 5)
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "query",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "viewer",
    "storageKey": null,
    "args": null,
    "concreteType": "Viewer",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "searchCountries",
        "args": [
          {
            "kind": "Literal",
            "name": "limit",
            "value": 5
          },
          {
            "kind": "Variable",
            "name": "query",
            "variableName": "query"
          }
        ],
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AutoCompleteRefetchQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "AutoCompleteRefetchQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "AutoCompleteRefetchQuery",
    "id": null,
    "text": "query AutoCompleteRefetchQuery(\n  $query: String!\n) {\n  viewer {\n    searchCountries(query: $query, limit: 5)\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '30407d42bfac0445bba8044758c286b7';
module.exports = node;
