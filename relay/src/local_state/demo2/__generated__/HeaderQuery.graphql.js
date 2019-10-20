/**
 * @flow
 * @relayHash b5d6865c6a21e92cea69cd21110773c3
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { DrawerButton_settings$ref } from "./DrawerButton_settings.graphql";
export type HeaderQueryVariables = {||};
export type HeaderQueryResponse = {|
  +user: {|
    +name: string
  |},
  +settings: {|
    +$fragmentRefs: DrawerButton_settings$ref
  |},
|};
export type HeaderQuery = {|
  variables: HeaderQueryVariables,
  response: HeaderQueryResponse,
|};
*/


/*
query HeaderQuery {
  user {
    name
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "HeaderQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ]
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
                "kind": "FragmentSpread",
                "name": "DrawerButton_settings",
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
    "name": "HeaderQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
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
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "HeaderQuery",
    "id": null,
    "text": "query HeaderQuery {\n  user {\n    name\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '45e6546f32d3c51aed16ad5ceed94308';
module.exports = node;
