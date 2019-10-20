/**
 * @flow
 * @relayHash 08558235bd887162c4d92c761eec674b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DrawerQueryVariables = {||};
export type DrawerQueryResponse = {|
  +__typename: string,
  +settings: {|
    +isDrawerOpen: boolean
  |},
|};
export type DrawerQuery = {|
  variables: DrawerQueryVariables,
  response: DrawerQueryResponse,
|};
*/


/*
query DrawerQuery {
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
    "name": "DrawerQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DrawerQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "DrawerQuery",
    "id": null,
    "text": "query DrawerQuery {\n  __typename\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0422c70ef955056613ac1f737e681143';
module.exports = node;
