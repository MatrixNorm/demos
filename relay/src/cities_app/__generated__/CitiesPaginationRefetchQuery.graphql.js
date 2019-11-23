/**
 * @flow
 * @relayHash 7ffa301c5401d82751e193fe0fa36b7f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { CitiesPagination_cities$ref } from "./CitiesPagination_cities.graphql";
export type CitiesPaginationRefetchQueryVariables = {|
  pageNo: number
|};
export type CitiesPaginationRefetchQueryResponse = {|
  +$fragmentRefs: CitiesPagination_cities$ref
|};
export type CitiesPaginationRefetchQuery = {|
  variables: CitiesPaginationRefetchQueryVariables,
  response: CitiesPaginationRefetchQueryResponse,
|};
*/


/*
query CitiesPaginationRefetchQuery(
  $pageNo: Int!
) {
  ...CitiesPagination_cities_2HjlGh
}

fragment CitiesPagination_cities_2HjlGh on Query {
  citiesPagination(pageNo: $pageNo) {
    nodes {
      id
      name
      population
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
    "name": "CitiesPaginationRefetchQuery",
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
    "name": "CitiesPaginationRefetchQuery",
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
                "name": "population",
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
    "name": "CitiesPaginationRefetchQuery",
    "id": null,
    "text": "query CitiesPaginationRefetchQuery(\n  $pageNo: Int!\n) {\n  ...CitiesPagination_cities_2HjlGh\n}\n\nfragment CitiesPagination_cities_2HjlGh on Query {\n  citiesPagination(pageNo: $pageNo) {\n    nodes {\n      id\n      name\n      population\n    }\n    hasNextPage\n    hasPrevPage\n    pageNo\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c40d33b2d78ca55c979a83ee656478f0';
module.exports = node;
