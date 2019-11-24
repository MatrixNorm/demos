/**
 * @flow
 * @relayHash 7755d278918152ad890e08614cca95cd
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { AutoComplete_suggestions$ref } from "./AutoComplete_suggestions.graphql";
export type AutoCompleteRefetchQueryVariables = {|
  query: string,
  limit: number,
|};
export type AutoCompleteRefetchQueryResponse = {|
  +viewer: {|
    +$fragmentRefs: AutoComplete_suggestions$ref
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
  $limit: Int!
) {
  viewer {
    ...AutoComplete_suggestions_3HzzW
  }
}

fragment AutoComplete_suggestions_3HzzW on Viewer {
  searchCountries(query: $query, limit: $limit)
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "query",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "limit",
    "type": "Int!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "limit",
    "variableName": "limit"
  },
  {
    "kind": "Variable",
    "name": "query",
    "variableName": "query"
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
    "selections": [
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
            "kind": "FragmentSpread",
            "name": "AutoComplete_suggestions",
            "args": (v1/*: any*/)
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AutoCompleteRefetchQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
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
            "args": (v1/*: any*/),
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "AutoCompleteRefetchQuery",
    "id": null,
    "text": "query AutoCompleteRefetchQuery(\n  $query: String!\n  $limit: Int!\n) {\n  viewer {\n    ...AutoComplete_suggestions_3HzzW\n  }\n}\n\nfragment AutoComplete_suggestions_3HzzW on Viewer {\n  searchCountries(query: $query, limit: $limit)\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd147e02ca84c86e86e60e5c2ab57b4b2';
module.exports = node;
