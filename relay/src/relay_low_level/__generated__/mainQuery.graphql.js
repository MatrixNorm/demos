/**
 * @flow
 * @relayHash 8e34ccef7dde63a2b674a6e9d0f8b0f2
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type mainQueryVariables = {|
  pageNo: number
|};
export type mainQueryResponse = {|
  +cities: ?{|
    +nodes: ?$ReadOnlyArray<{|
      +id: string,
      +name: string,
      +population: number,
    |}>,
    +pageNo: number,
    +hasNextPage: boolean,
  |}
|};
export type mainQuery = {|
  variables: mainQueryVariables,
  response: mainQueryResponse,
|};
*/


/*
query mainQuery(
  $pageNo: Int!
) {
  cities(pageNo: $pageNo) {
    nodes {
      id
      name
      population
    }
    pageNo
    hasNextPage
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "pageNo",
    "type": "Int!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "cities",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "pageNo",
        "variableName": "pageNo"
      }
    ],
    "concreteType": "CityPagination",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "nodes",
        "storageKey": null,
        "args": null,
        "concreteType": "City",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "population",
            "args": null,
            "storageKey": null
          }
        ]
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "pageNo",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "hasNextPage",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "mainQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "mainQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "mainQuery",
    "id": null,
    "text": "query mainQuery(\n  $pageNo: Int!\n) {\n  cities(pageNo: $pageNo) {\n    nodes {\n      id\n      name\n      population\n    }\n    pageNo\n    hasNextPage\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a5deb53d137603e2ff17cd7705137e32';
module.exports = node;
