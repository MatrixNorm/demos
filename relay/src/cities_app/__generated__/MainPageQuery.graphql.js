/**
 * @flow
 * @relayHash f841988af72fd2dc99ec3d197b52d470
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { CitiesPaginationListingPanel_cities$ref } from "./CitiesPaginationListingPanel_cities.graphql";
import type { CitiesPaginationParametersPanel_metadata$ref } from "./CitiesPaginationParametersPanel_metadata.graphql";
export type MainPageQueryVariables = {|
  pageSize: number,
  pageNo: number,
|};
export type MainPageQueryResponse = {|
  +citiesMetadata: ?{|
    +$fragmentRefs: CitiesPaginationParametersPanel_metadata$ref
  |},
  +citiesPagination: ?{|
    +$fragmentRefs: CitiesPaginationListingPanel_cities$ref
  |},
|};
export type MainPageQuery = {|
  variables: MainPageQueryVariables,
  response: MainPageQueryResponse,
|};
*/


/*
query MainPageQuery(
  $pageSize: Int!
  $pageNo: Int!
) {
  citiesMetadata {
    ...CitiesPaginationParametersPanel_metadata
  }
  citiesPagination(pageNo: $pageNo, pageSize: $pageSize) {
    ...CitiesPaginationListingPanel_cities_1eNWgj
  }
}

fragment CitiesPaginationListingPanel_cities_1eNWgj on CitiesPagination {
  nodes {
    id
    name
    country
    population
    lat
    lng
  }
  pageNo
  hasNextPage
  hasPrevPage
}

fragment CitiesPaginationParametersPanel_metadata on CitiesMetadata {
  populationLowerBound
  populationUpperBound
  latLowerBound
  latUpperBound
  lngLowerBound
  lngUpperBound
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "pageSize",
    "type": "Int!",
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
    "name": "pageNo",
    "variableName": "pageNo"
  },
  {
    "kind": "Variable",
    "name": "pageSize",
    "variableName": "pageSize"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "MainPageQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "citiesMetadata",
        "storageKey": null,
        "args": null,
        "concreteType": "CitiesMetadata",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CitiesPaginationParametersPanel_metadata",
            "args": null
          }
        ]
      },
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
            "kind": "FragmentSpread",
            "name": "CitiesPaginationListingPanel_cities",
            "args": (v1/*: any*/)
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "MainPageQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "citiesMetadata",
        "storageKey": null,
        "args": null,
        "concreteType": "CitiesMetadata",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "populationLowerBound",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "populationUpperBound",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "latLowerBound",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "latUpperBound",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "lngLowerBound",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "lngUpperBound",
            "args": null,
            "storageKey": null
          }
        ]
      },
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
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "MainPageQuery",
    "id": null,
    "text": "query MainPageQuery(\n  $pageSize: Int!\n  $pageNo: Int!\n) {\n  citiesMetadata {\n    ...CitiesPaginationParametersPanel_metadata\n  }\n  citiesPagination(pageNo: $pageNo, pageSize: $pageSize) {\n    ...CitiesPaginationListingPanel_cities_1eNWgj\n  }\n}\n\nfragment CitiesPaginationListingPanel_cities_1eNWgj on CitiesPagination {\n  nodes {\n    id\n    name\n    country\n    population\n    lat\n    lng\n  }\n  pageNo\n  hasNextPage\n  hasPrevPage\n}\n\nfragment CitiesPaginationParametersPanel_metadata on CitiesMetadata {\n  populationLowerBound\n  populationUpperBound\n  latLowerBound\n  latUpperBound\n  lngLowerBound\n  lngUpperBound\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '40e54e9ba738825ed3eca01825d4f93a';
module.exports = node;
