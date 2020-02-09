/* tslint:disable */
/* eslint-disable */
/* @relayHash 31458a32909263976f39724fb841f78c */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CitySearchParamsInput = {
    countryNameContains?: string | null;
    populationGte?: number | null;
    populationLte?: number | null;
};
export type CitiesBrowserPanelRefetchQueryVariables = {
    pageSize: number;
    after?: string | null;
    before?: string | null;
    searchParams?: CitySearchParamsInput | null;
};
export type CitiesBrowserPanelRefetchQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"CitiesBrowserPanel_cities">;
};
export type CitiesBrowserPanelRefetchQuery = {
    readonly response: CitiesBrowserPanelRefetchQueryResponse;
    readonly variables: CitiesBrowserPanelRefetchQueryVariables;
};



/*
query CitiesBrowserPanelRefetchQuery(
  $pageSize: Int!
  $after: String
  $before: String
  $searchParams: CitySearchParamsInput
) {
  ...CitiesBrowserPanel_cities_mwT4m
}

fragment CitiesBrowserPanel_cities_mwT4m on Query {
  citiesPagination(pageSize: $pageSize, after: $after, before: $before, searchParams: $searchParams) {
    ...CitiesPagination_page
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
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "pageSize",
    "type": "Int!",
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
    "name": "CitiesBrowserPanelRefetchQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "CitiesBrowserPanel_cities",
        "args": (v1/*: any*/)
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CitiesBrowserPanelRefetchQuery",
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
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "CitiesBrowserPanelRefetchQuery",
    "id": null,
    "text": "query CitiesBrowserPanelRefetchQuery(\n  $pageSize: Int!\n  $after: String\n  $before: String\n  $searchParams: CitySearchParamsInput\n) {\n  ...CitiesBrowserPanel_cities_mwT4m\n}\n\nfragment CitiesBrowserPanel_cities_mwT4m on Query {\n  citiesPagination(pageSize: $pageSize, after: $after, before: $before, searchParams: $searchParams) {\n    ...CitiesPagination_page\n  }\n}\n\nfragment CitiesPagination_page on CitiesPagination {\n  hasNext\n  hasPrev\n  nodes {\n    id\n    ...CitySummary_city\n  }\n}\n\nfragment CitySummary_city on City {\n  id\n  name\n  country\n  population\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '364b88959706e62514d9ee8b9fe12921';
export default node;
