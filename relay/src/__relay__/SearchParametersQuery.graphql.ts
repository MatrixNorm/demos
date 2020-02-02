/* tslint:disable */
/* eslint-disable */
/* @relayHash 3fd08c9c7879d10e61b72750392c5545 */

import { ConcreteRequest } from "relay-runtime";
export type SearchParametersQueryVariables = {};
export type SearchParametersQueryResponse = {
    readonly __typename: string;
    readonly uiState: {
        readonly id: string;
        readonly citySearchParams: {
            readonly countryNameContains: string | null;
            readonly populationGte: number | null;
            readonly populationLte: number | null;
        } | null;
    } | null;
};
export type SearchParametersQuery = {
    readonly response: SearchParametersQueryResponse;
    readonly variables: SearchParametersQueryVariables;
};



/*
query SearchParametersQuery {
  __typename
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "__typename",
    "args": null,
    "storageKey": null
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
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
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
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "SearchParametersQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "SearchParametersQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "SearchParametersQuery",
    "id": null,
    "text": "query SearchParametersQuery {\n  __typename\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'f89105c0e6abfb9189eea630631b40ca';
export default node;
