/* tslint:disable */
/* eslint-disable */
/* @relayHash c00439e3a2059305887405041ae00105 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CitySearchParamsInput = {
    countryNameContains?: string | null;
    populationGte?: number | null;
    populationLte?: number | null;
};
export type CitiesBrowserPanelQueryVariables = {
    pageSize?: number | null;
    after?: string | null;
    before?: string | null;
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
  $pageSize: Int
  $after: String
  $before: String
  $searchParams: CitySearchParamsInput
) {
  ...CitiesBrowserPanel_cities_mwT4m
  ...CitiesBrowserPanel_searchMetadata
}

fragment CitiesBrowserPanel_cities_mwT4m on Query {
  citiesPagination(pageSize: $pageSize, after: $after, before: $before, searchParams: $searchParams) {
    ...CitiesPagination_page
  }
}

fragment CitiesBrowserPanel_searchMetadata on Query {
  citiesMetadata {
    ...SearchParameters_metadata
  }
}

fragment CitiesPagination_page on CitiesPagination {
  hasNext
  hasPrev
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
    "name": "pageSize",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "after",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "before",
    "type": "String",
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
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "before",
    "variableName": "before"
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
            "name": "hasNext",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "hasPrev",
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
    "text": "query CitiesBrowserPanelQuery(\n  $pageSize: Int\n  $after: String\n  $before: String\n  $searchParams: CitySearchParamsInput\n) {\n  ...CitiesBrowserPanel_cities_mwT4m\n  ...CitiesBrowserPanel_searchMetadata\n}\n\nfragment CitiesBrowserPanel_cities_mwT4m on Query {\n  citiesPagination(pageSize: $pageSize, after: $after, before: $before, searchParams: $searchParams) {\n    ...CitiesPagination_page\n  }\n}\n\nfragment CitiesBrowserPanel_searchMetadata on Query {\n  citiesMetadata {\n    ...SearchParameters_metadata\n  }\n}\n\nfragment CitiesPagination_page on CitiesPagination {\n  hasNext\n  hasPrev\n  nodes {\n    id\n    ...CitySummary_city\n  }\n}\n\nfragment CitySummary_city on City {\n  id\n  name\n  country\n  population\n}\n\nfragment SearchParameters_metadata on CitiesMetadata {\n  populationLowerBound\n  populationUpperBound\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'a929dd2e9174f00ff55ccfd430c060a3';
export default node;
