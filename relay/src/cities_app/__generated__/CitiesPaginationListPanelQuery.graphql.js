/**
 * @flow
 * @relayHash fca1bf41610823c06354f080aeec03bb
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { CitiesPagination_cities$ref } from "./CitiesPagination_cities.graphql";
export type CitiesPaginationListPanelQueryVariables = {|
  pageNo: number
|};
export type CitiesPaginationListPanelQueryResponse = {|
  +$fragmentRefs: CitiesPagination_cities$ref
|};
export type CitiesPaginationListPanelQuery = {|
  variables: CitiesPaginationListPanelQueryVariables,
  response: CitiesPaginationListPanelQueryResponse,
|};
*/


/*
query CitiesPaginationListPanelQuery(
  $pageNo: Int!
) {
  ...CitiesPagination_cities_2HjlGh
}

fragment CitiesPagination_cities_2HjlGh on Query {
  citiesPagination(pageNo: $pageNo) {
    nodes {
      id
      name
      country
      population
      lat
      lng
    }
    hasNextPage
    hasPrevPage
    pageNo
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
    "kind": "Variable",
    "name": "pageNo",
    "variableName": "pageNo"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CitiesPaginationListPanelQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "CitiesPagination_cities",
        "args": (v1/*: any*/)
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CitiesPaginationListPanelQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "citiesPagination",
        "storageKey": null,
        "args": (v1/*: any*/),
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
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "population",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "lat",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "lng",
                "args": null,
                "storageKey": null
              }
            ]
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
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "pageNo",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "CitiesPaginationListPanelQuery",
    "id": null,
    "text": "query CitiesPaginationListPanelQuery(\n  $pageNo: Int!\n) {\n  ...CitiesPagination_cities_2HjlGh\n}\n\nfragment CitiesPagination_cities_2HjlGh on Query {\n  citiesPagination(pageNo: $pageNo) {\n    nodes {\n      id\n      name\n      country\n      population\n      lat\n      lng\n    }\n    hasNextPage\n    hasPrevPage\n    pageNo\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3bf92d047af77e3c5850ff6b187a4dc1';
module.exports = node;
