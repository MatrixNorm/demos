/* tslint:disable */
/* eslint-disable */
/* @relayHash 06d1189892379b16bcf373ad9f5e592a */

import { ConcreteRequest } from "relay-runtime";
export type SearchParametersStoryUIQueryVariables = {};
export type SearchParametersStoryUIQueryResponse = {
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
export type SearchParametersStoryUIQuery = {
    readonly response: SearchParametersStoryUIQueryResponse;
    readonly variables: SearchParametersStoryUIQueryVariables;
};



/*
query SearchParametersStoryUIQuery {
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
    "name": "SearchParametersStoryUIQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "SearchParametersStoryUIQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "SearchParametersStoryUIQuery",
    "id": null,
    "text": "query SearchParametersStoryUIQuery {\n  __typename\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'ed25173f39312f6c40cbc859db784ad3';
export default node;
