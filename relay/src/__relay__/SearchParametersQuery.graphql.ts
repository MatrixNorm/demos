/* tslint:disable */
/* eslint-disable */
/* @relayHash 77b1d4c687fcdb3b261f39460e1c085f */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SearchParametersQueryVariables = {};
export type SearchParametersQueryResponse = {
    readonly citiesMetadata: {
        readonly " $fragmentRefs": FragmentRefs<"SearchParameters_metadata">;
    } | null;
    readonly uiState: {
        readonly " $fragmentRefs": FragmentRefs<"SearchParameters_searchParams">;
    } | null;
};
export type SearchParametersQuery = {
    readonly response: SearchParametersQueryResponse;
    readonly variables: SearchParametersQueryVariables;
};



/*
query SearchParametersQuery {
  citiesMetadata {
    ...SearchParameters_metadata
  }
}

fragment SearchParameters_metadata on CitiesMetadata {
  populationLowerBound
  populationUpperBound
}
*/

const node: ConcreteRequest = {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "SearchParametersQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
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
            "name": "SearchParameters_metadata",
            "args": null
          }
        ]
      },
      {
        "kind": "ClientExtension",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "uiState",
            "storageKey": null,
            "args": null,
            "concreteType": "UIState",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "SearchParameters_searchParams",
                "args": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "SearchParametersQuery",
    "argumentDefinitions": [],
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
          }
        ]
      },
      {
        "kind": "ClientExtension",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "uiState",
            "storageKey": null,
            "args": null,
            "concreteType": "UIState",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "citySearchParams",
                "storageKey": null,
                "args": null,
                "concreteType": "UICitySearchParams",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "countryNameContains",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "populationGte",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "populationLte",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
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
    "name": "SearchParametersQuery",
    "id": null,
    "text": "query SearchParametersQuery {\n  citiesMetadata {\n    ...SearchParameters_metadata\n  }\n}\n\nfragment SearchParameters_metadata on CitiesMetadata {\n  populationLowerBound\n  populationUpperBound\n}\n",
    "metadata": {}
  }
};
(node as any).hash = 'ba9f652dbab82f598565ea9362c24a51';
export default node;
