/**
 * @flow
 * @relayHash e07914bd70cc149cf8ba8f84d746ae08
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SearchParametersQueryVariables = {||};
export type SearchParametersQueryResponse = {|
  +__typename: string,
  +uiState: {|
    +id: string,
    +citySearchParams: ?{|
      +countryNameContains: ?string,
      +populationGte: ?number,
    |},
  |},
|};
export type SearchParametersQuery = {|
  variables: SearchParametersQueryVariables,
  response: SearchParametersQueryResponse,
|};
*/


/*
query SearchParametersQuery {
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
// prettier-ignore
(node/*: any*/).hash = 'ddd583b617c9a9d8d4087aedc51cebbd';
module.exports = node;
