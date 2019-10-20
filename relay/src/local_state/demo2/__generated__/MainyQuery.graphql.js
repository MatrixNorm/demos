/**
 * @flow
 * @relayHash ef25ce3b4b2033932982287f8d2dfa1f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type MainyQueryVariables = {||};
export type MainyQueryResponse = {|
  +__typename: string,
  +settings: {|
    +isDrawerOpen: boolean
  |},
|};
export type MainyQuery = {|
  variables: MainyQueryVariables,
  response: MainyQueryResponse,
|};
*/


/*
query MainyQuery {
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
        "name": "settings",
        "storageKey": null,
        "args": null,
        "concreteType": "Settings",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "isDrawerOpen",
            "args": null,
            "storageKey": null
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
    "name": "MainyQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "MainyQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "MainyQuery",
    "id": null,
    "text": "query MainyQuery {\n  __typename\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '032c64924fd490e733ef74a04e348736';
module.exports = node;
