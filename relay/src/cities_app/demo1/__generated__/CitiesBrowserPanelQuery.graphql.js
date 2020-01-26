/**
 * @flow
 * @relayHash f6a35eb6392be226ed4d49912fa98aee
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { CitiesBrowserPanel_cities$ref } from "./CitiesBrowserPanel_cities.graphql";
import type { CitiesBrowserPanel_searchMetadata$ref } from "./CitiesBrowserPanel_searchMetadata.graphql";
export type CitiesOrderAttr = "countryASC" | "countryDESC" | "latASC" | "latDESC" | "lngASC" | "lngDESC" | "nameASC" | "nameDESC" | "populationASC" | "populationDESC";
export type CitySearchParamsInput = {|
  countryNameContains?: ?string,
  populationGte?: ?number,
  populationLte?: ?number,
  ordering?: ?CitiesOrderAttr,
|};
export type CitiesBrowserPanelQueryVariables = {|
  pageNo: number,
  pageSize: number,
  searchParams?: ?CitySearchParamsInput,
|};
export type CitiesBrowserPanelQueryResponse = {|
  +$fragmentRefs: CitiesBrowserPanel_cities$ref & CitiesBrowserPanel_searchMetadata$ref
|};
export type CitiesBrowserPanelQuery = {|
  variables: CitiesBrowserPanelQueryVariables,
  response: CitiesBrowserPanelQueryResponse,
|};
*/


/*
query CitiesBrowserPanelQuery(
  $pageNo: Int!
  $pageSize: Int!
  $searchParams: CitySearchParamsInput
) {
  ...CitiesBrowserPanel_cities_2NHXxp
  ...CitiesBrowserPanel_searchMetadata
}

fragment CitiesBrowserPanel_cities_2NHXxp on Query {
  citiesPagination(pageNo: $pageNo, pageSize: $pageSize, searchParams: $searchParams) {
    ...CitiesPagination_page
  }
}

fragment CitiesBrowserPanel_searchMetadata on Query {
  citiesMetadata {
    ...SearchParameters_metadata
  }
}

fragment CitiesPagination_page on CitiesPagination {
  pageNo
  hasNextPage
  hasPrevPage
  nodes {
    ...CitySummary_city
    id
  }
}

fragment CitySummary_city on City {
  id
  name
  country
  population
}

fragment SearchParameters_metadata on CitiesMetadata {
  populationLowerBound
  populationUpperBound
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "pageNo",
    "type": "Int!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "pageSize",
    "type": "Int!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "searchParams",
    "type": "CitySearchParamsInput",
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
  },
  {
    "kind": "Variable",
    "name": "searchParams",
    "variableName": "searchParams"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CitiesBrowserPanelQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "CitiesBrowserPanel_cities",
        "args": (v1/*: any*/)
      },
      {
        "kind": "FragmentSpread",
        "name": "CitiesBrowserPanel_searchMetadata",
        "args": null
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CitiesBrowserPanelQuery",
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
          },
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
              }
            ]
          }
        ]
      },
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
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "CitiesBrowserPanelQuery",
    "id": null,
    "text": "query CitiesBrowserPanelQuery(\n  $pageNo: Int!\n  $pageSize: Int!\n  $searchParams: CitySearchParamsInput\n) {\n  ...CitiesBrowserPanel_cities_2NHXxp\n  ...CitiesBrowserPanel_searchMetadata\n}\n\nfragment CitiesBrowserPanel_cities_2NHXxp on Query {\n  citiesPagination(pageNo: $pageNo, pageSize: $pageSize, searchParams: $searchParams) {\n    ...CitiesPagination_page\n  }\n}\n\nfragment CitiesBrowserPanel_searchMetadata on Query {\n  citiesMetadata {\n    ...SearchParameters_metadata\n  }\n}\n\nfragment CitiesPagination_page on CitiesPagination {\n  pageNo\n  hasNextPage\n  hasPrevPage\n  nodes {\n    ...CitySummary_city\n    id\n  }\n}\n\nfragment CitySummary_city on City {\n  id\n  name\n  country\n  population\n}\n\nfragment SearchParameters_metadata on CitiesMetadata {\n  populationLowerBound\n  populationUpperBound\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ee98e646b8bf69b2ca5d132c92bdc9a0';
module.exports = node;
