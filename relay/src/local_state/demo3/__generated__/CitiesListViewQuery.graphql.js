/**
 * @flow
 * @relayHash fed8c9c81201a6590e8a2f951889a59b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { CitiesPagination_cities$ref } from "./CitiesPagination_cities.graphql";
export type Continent = "Europe" | "NorthAmerica";
export type CitiesListViewQueryVariables = {|
  continent: Continent,
  pageNo: number,
|};
export type CitiesListViewQueryResponse = {|
  +viewer: ?{|
    +$fragmentRefs: CitiesPagination_cities$ref
  |}
|};
export type CitiesListViewQuery = {|
  variables: CitiesListViewQueryVariables,
  response: CitiesListViewQueryResponse,
|};
*/


/*
query CitiesListViewQuery(
  $continent: Continent!
  $pageNo: Int!
) {
  viewer {
    ...CitiesPagination_cities_BhjEZ
  }
}

fragment CitiesPagination_cities_BhjEZ on Viewer {
  citiesPagination(continent: $continent, pageNo: $pageNo) {
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
    "name": "continent",
    "type": "Continent!",
    "defaultValue": null
  },
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
    "name": "continent",
    "variableName": "continent"
  },
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
    "name": "CitiesListViewQuery",
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
            "name": "CitiesPagination_cities",
            "args": (v1/*: any*/)
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CitiesListViewQuery",
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
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "CitiesListViewQuery",
    "id": null,
    "text": "query CitiesListViewQuery(\n  $continent: Continent!\n  $pageNo: Int!\n) {\n  viewer {\n    ...CitiesPagination_cities_BhjEZ\n  }\n}\n\nfragment CitiesPagination_cities_BhjEZ on Viewer {\n  citiesPagination(continent: $continent, pageNo: $pageNo) {\n    nodes {\n      id\n      name\n      population\n    }\n    hasNextPage\n    hasPrevPage\n    pageNo\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd8b1635b8d53ffb35670f63a53216907';
module.exports = node;
