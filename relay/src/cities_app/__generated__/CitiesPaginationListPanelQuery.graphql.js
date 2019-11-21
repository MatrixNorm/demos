/**
 * @flow
 * @relayHash 7220adc7493c76152bfe3bffc9c4e2e0
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CitiesPaginationListPanelQueryVariables = {||};
export type CitiesPaginationListPanelQueryResponse = {|
  +citiesPagination: ?{|
    +nodes: ?$ReadOnlyArray<{|
      +id: string,
      +name: string,
      +country: string,
    |}>,
    +pageNo: number,
    +hasNextPage: boolean,
    +hasPrevPage: boolean,
  |}
|};
export type CitiesPaginationListPanelQuery = {|
  variables: CitiesPaginationListPanelQueryVariables,
  response: CitiesPaginationListPanelQueryResponse,
|};
*/


/*
query CitiesPaginationListPanelQuery {
  citiesPagination(pageNo: 0) {
    nodes {
      id
      name
      country
    }
    pageNo
    hasNextPage
    hasPrevPage
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "citiesPagination",
    "storageKey": "citiesPagination(pageNo:0)",
    "args": [
      {
        "kind": "Literal",
        "name": "pageNo",
        "value": 0
      }
    ],
    "concreteType": "CitiesPagination",
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
            "name": "country",
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
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "hasPrevPage",
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
    "name": "CitiesPaginationListPanelQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CitiesPaginationListPanelQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "CitiesPaginationListPanelQuery",
    "id": null,
    "text": "query CitiesPaginationListPanelQuery {\n  citiesPagination(pageNo: 0) {\n    nodes {\n      id\n      name\n      country\n    }\n    pageNo\n    hasNextPage\n    hasPrevPage\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a6a42c6489fa6965c821b1899e18e649';
module.exports = node;
