/**
 * @flow
 * @relayHash 14bcbcf8654d8a8d2233c6409677ff6c
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
  +cities: ?{|
    +$fragmentRefs: Pagination_cities$ref
  |}
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
  cities(pageNo: $pageNo) {
    ...Pagination_cities
  }
}

fragment Pagination_cities on CityPagination {
  nodes {
    id
    name
    population
  }
  pageNo
  hasNextPage
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
        "kind": "LinkedField",
        "alias": null,
        "name": "cities",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CityPagination",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Pagination_cities",
            "args": null
          }
        ]
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
    "text": "query PaginationQuery(\n  $pageNo: Int!\n) {\n  cities(pageNo: $pageNo) {\n    ...Pagination_cities\n  }\n}\n\nfragment Pagination_cities on CityPagination {\n  nodes {\n    id\n    name\n    population\n  }\n  pageNo\n  hasNextPage\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '41409ebd5f82019d4416f6071f7c1675';
module.exports = node;
