/**
 * @flow
 * @relayHash 26cf6b82880961ca4962c4b4bc4a3009
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { Pagination_cities$ref } from "./Pagination_cities.graphql";
export type PaginationQueryVariables = {|
  pageNo: number
|};
export type PaginationQueryResponse = {|
  +$fragmentRefs: Pagination_cities$ref
|};
export type PaginationQuery = {|
  variables: PaginationQueryVariables,
  response: PaginationQueryResponse,
|};
*/


/*
query PaginationQuery(
  $pageNo: Int!
) {
  ...Pagination_cities_2HjlGh
}

fragment Pagination_cities_2HjlGh on Query {
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
    "kind": "Variable",
    "name": "pageNo",
    "variableName": "pageNo"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "PaginationQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "Pagination_cities",
        "args": (v1/*: any*/)
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "PaginationQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "cities",
        "storageKey": null,
        "args": (v1/*: any*/),
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
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "PaginationQuery",
    "id": null,
    "text": "query PaginationQuery(\n  $pageNo: Int!\n) {\n  ...Pagination_cities_2HjlGh\n}\n\nfragment Pagination_cities_2HjlGh on Query {\n  cities(pageNo: $pageNo) {\n    nodes {\n      id\n      name\n      population\n    }\n    pageNo\n    hasNextPage\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a32da65be942f0894df19a191ddc355c';
module.exports = node;
