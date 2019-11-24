/**
 * @flow
 * @relayHash a55585bf783b99f32cc80e92eccdf852
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { AutoComplete_suggestions$ref } from "./AutoComplete_suggestions.graphql";
export type AppQueryVariables = {|
  query: string,
  limit: number,
|};
export type AppQueryResponse = {|
  +viewer: {|
    +__typename: string,
    +$fragmentRefs: AutoComplete_suggestions$ref,
  |}
|};
export type AppQuery = {|
  variables: AppQueryVariables,
  response: AppQueryResponse,
|};
*/


/*
query AppQuery(
  $query: String!
  $limit: Int!
) {
  viewer {
    __typename
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
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v2 = [
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
    "name": "AppQuery",
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
          (v1/*: any*/),
          {
            "kind": "FragmentSpread",
            "name": "AutoComplete_suggestions",
            "args": (v2/*: any*/)
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AppQuery",
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
          (v1/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "searchCountries",
            "args": (v2/*: any*/),
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "AppQuery",
    "id": null,
    "text": "query AppQuery(\n  $query: String!\n  $limit: Int!\n) {\n  viewer {\n    __typename\n    ...AutoComplete_suggestions_3HzzW\n  }\n}\n\nfragment AutoComplete_suggestions_3HzzW on Viewer {\n  searchCountries(query: $query, limit: $limit)\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '99fc678ea6b5fdbcf5990f9c5b52a43f';
module.exports = node;
