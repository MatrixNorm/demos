/**
 * @flow
 * @relayHash 1474c086209c32328852973f8e20f392
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AppQueryVariables = {|
  query: string,
  limit: number,
|};
export type AppQueryResponse = {|
  +viewer: {|
    +searchCountries: ?$ReadOnlyArray<string>
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
    searchCountries(query: $query, limit: $limit)
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
            "kind": "Variable",
            "name": "limit",
            "variableName": "limit"
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
    "name": "AppQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "AppQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "AppQuery",
    "id": null,
    "text": "query AppQuery(\n  $query: String!\n  $limit: Int!\n) {\n  viewer {\n    searchCountries(query: $query, limit: $limit)\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ed5279011acf007a554925931d5a41c7';
module.exports = node;
