/* tslint:disable */
/* eslint-disable */
/* @relayHash 083e710345fa89dfd94ea45b39cab1cf */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CitiesOrderAttr = "countryASC" | "countryDESC" | "latASC" | "latDESC" | "lngASC" | "lngDESC" | "nameASC" | "nameDESC" | "populationASC" | "populationDESC" | "%future added value";
export type CitySearchParamsInput = {
    countryNameContains?: string | null;
    populationGte?: number | null;
    populationLte?: number | null;
    ordering?: CitiesOrderAttr | null;
};
export type CitiesBrowserPanelQueryVariables = {
    pageNo: number;
    pageSize?: number | null;
    searchParams?: CitySearchParamsInput | null;
};
export type CitiesBrowserPanelQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"CitiesBrowserPanel_cities" | "CitiesBrowserPanel_searchMetadata">;
};
export type CitiesBrowserPanelQuery = {
    readonly response: CitiesBrowserPanelQueryResponse;
    readonly variables: CitiesBrowserPanelQueryVariables;
};



/*
query CitiesBrowserPanelQuery(
  $pageNo: Int!
  $pageSize: Int
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
    id
    ...CitySummary_city
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

const node: ConcreteRequest = (function(){
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
    "type": "Int",
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
    "text": "query CitiesBrowserPanelQuery(\n  $pageNo: Int!\n  $pageSize: Int\n  $searchParams: CitySearchParamsInput\n) {\n  ...CitiesBrowserPanel_cities_2NHXxp\n  ...CitiesBrowserPanel_searchMetadata\n}\n\nfragment CitiesBrowserPanel_cities_2NHXxp on Query {\n  citiesPagination(pageNo: $pageNo, pageSize: $pageSize, searchParams: $searchParams) {\n    ...CitiesPagination_page\n  }\n}\n\nfragment CitiesBrowserPanel_searchMetadata on Query {\n  citiesMetadata {\n    ...SearchParameters_metadata\n  }\n}\n\nfragment CitiesPagination_page on CitiesPagination {\n  pageNo\n  hasNextPage\n  hasPrevPage\n  nodes {\n    id\n    ...CitySummary_city\n  }\n}\n\nfragment CitySummary_city on City {\n  id\n  name\n  country\n  population\n}\n\nfragment SearchParameters_metadata on CitiesMetadata {\n  populationLowerBound\n  populationUpperBound\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'e855fb69e617eafb3ee73ce629d7c556';
export default node;
