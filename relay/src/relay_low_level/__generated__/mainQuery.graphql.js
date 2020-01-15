/**
 * @flow
 * @relayHash bfee22664779537c05cba4f35c81ee7a
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type mainQueryVariables = {||};
export type mainQueryResponse = {|
  +__typename: string,
  +uiState: {|
    +id: string,
    +citySearchParams: ?{|
      +countryNameContains: ?string,
      +populationGte: ?number,
    |},
  |},
|};
export type mainQuery = {|
  variables: mainQueryVariables,
  response: mainQueryResponse,
|};
*/


/*
query mainQuery {
  __typename
}
*/

const node/*: ConcreteRequest*/ = (function(){
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
    "name": "mainQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "mainQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "mainQuery",
    "id": null,
    "text": "query mainQuery {\n  __typename\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1a6316675a400aa2be354d86b1df6f63';
module.exports = node;
