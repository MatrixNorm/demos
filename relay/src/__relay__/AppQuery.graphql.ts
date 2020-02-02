/* tslint:disable */
/* eslint-disable */
/* @relayHash e9a4813729d239dfe987ed1e2fdbb565 */

import { ConcreteRequest } from "relay-runtime";
export type AppQueryVariables = {};
export type AppQueryResponse = {
    readonly __typename: string;
    readonly uiState: {
        readonly citySearchParams: {
            readonly countryNameContains: string | null;
            readonly populationGte: number | null;
            readonly populationLte: number | null;
        } | null;
    } | null;
};
export type AppQuery = {
    readonly response: AppQueryResponse;
    readonly variables: AppQueryVariables;
};



/*
query AppQuery {
  __typename
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v1 = {
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
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AppQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      (v0/*: any*/),
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
              (v1/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AppQuery",
    "argumentDefinitions": [],
    "selections": [
      (v0/*: any*/),
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
              (v1/*: any*/),
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
    "name": "AppQuery",
    "id": null,
    "text": "query AppQuery {\n  __typename\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '257313096fd3a1e5e1b0b8c632c4d839';
export default node;
