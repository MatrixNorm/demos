/**
 * @flow
 * @relayHash 0692cf18600db1363b324ee3490d46a0
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type MainSectionQueryVariables = {||};
export type MainSectionQueryResponse = {|
  +__typename: string,
  +settings: {|
    +isDrawerOpen: boolean
  |},
|};
export type MainSectionQuery = {|
  variables: MainSectionQueryVariables,
  response: MainSectionQueryResponse,
|};
*/


/*
query MainSectionQuery {
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
    "name": "MainSectionQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "MainSectionQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "MainSectionQuery",
    "id": null,
    "text": "query MainSectionQuery {\n  __typename\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'adb81f9a1b8a071ec657f4b632556d0f';
module.exports = node;
