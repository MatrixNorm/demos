/**
 * @flow
 * @relayHash 258c2fc42dc6afa1536a351cd80202f7
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { CitiesPaginationListingPanel_cities$ref } from "./CitiesPaginationListingPanel_cities.graphql";
export type CitiesOrderAttr = "countryASC" | "countryDESC" | "latASC" | "latDESC" | "lngASC" | "lngDESC" | "nameASC" | "nameDESC" | "populationASC" | "populationDESC";
export type CitySearchParamsInput = {|
  cityNameStartsWith?: ?string,
  countryName?: ?string,
  populationGte?: ?number,
  populationLte?: ?number,
  ordering?: ?CitiesOrderAttr,
|};
export type CitiesPaginationListingPanelRefetchQueryVariables = {|
  pageNo: number,
  pageSize: number,
  searchParams?: ?CitySearchParamsInput,
|};
export type CitiesPaginationListingPanelRefetchQueryResponse = {|
  +citiesPagination: ?{|
    +$fragmentRefs: CitiesPaginationListingPanel_cities$ref
  |}
|};
export type CitiesPaginationListingPanelRefetchQuery = {|
  variables: CitiesPaginationListingPanelRefetchQueryVariables,
  response: CitiesPaginationListingPanelRefetchQueryResponse,
|};
*/


/*
query CitiesPaginationListingPanelRefetchQuery(
  $pageNo: Int!
  $pageSize: Int!
  $searchParams: CitySearchParamsInput
) {
  citiesPagination(pageNo: $pageNo, pageSize: $pageSize, searchParams: $searchParams) {
    ...CitiesPaginationListingPanel_cities_2NHXxp
  }
}

fragment CitiesPaginationListingPanel_cities_2NHXxp on CitiesPagination {
  nodes {
    name
    country
    population
    lat
    lng
    id
  }
  pageNo
  hasNextPage
  hasPrevPage
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
    "name": "CitiesPaginationListingPanelRefetchQuery",
    "type": "Query",
    "metadata": null,
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
    "name": "CitiesPaginationListingPanelRefetchQuery",
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
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
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
    "name": "CitiesPaginationListingPanelRefetchQuery",
    "id": null,
    "text": "query CitiesPaginationListingPanelRefetchQuery(\n  $pageNo: Int!\n  $pageSize: Int!\n  $searchParams: CitySearchParamsInput\n) {\n  citiesPagination(pageNo: $pageNo, pageSize: $pageSize, searchParams: $searchParams) {\n    ...CitiesPaginationListingPanel_cities_2NHXxp\n  }\n}\n\nfragment CitiesPaginationListingPanel_cities_2NHXxp on CitiesPagination {\n  nodes {\n    name\n    country\n    population\n    lat\n    lng\n    id\n  }\n  pageNo\n  hasNextPage\n  hasPrevPage\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1790ff84cb633c2a45fb743f98738ace';
module.exports = node;
