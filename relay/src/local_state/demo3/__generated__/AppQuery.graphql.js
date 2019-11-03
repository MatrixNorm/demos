/**
 * @flow
 * @relayHash 78f202f08121a6ea4cdbef2bff1e0ba9
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { CitiesListView_localSettings$ref } from "./CitiesListView_localSettings.graphql";
import type { ContinentSelector_localSettings$ref } from "./ContinentSelector_localSettings.graphql";
export type AppQueryVariables = {||};
export type AppQueryResponse = {|
  +__typename: string,
  +localSettings: {|
    +$fragmentRefs: ContinentSelector_localSettings$ref & CitiesListView_localSettings$ref
  |},
|};
export type AppQuery = {|
  variables: AppQueryVariables,
  response: AppQueryResponse,
|};
*/


/*
query AppQuery {
  __typename
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
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
            "name": "localSettings",
            "storageKey": null,
            "args": null,
            "concreteType": "LocalSettings",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "ContinentSelector_localSettings",
                "args": null
              },
              {
                "kind": "FragmentSpread",
                "name": "CitiesListView_localSettings",
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
            "name": "localSettings",
            "storageKey": null,
            "args": null,
            "concreteType": "LocalSettings",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "allContinents",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "selectedContinent",
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
// prettier-ignore
(node/*: any*/).hash = 'e5ef5f858bb71694ec72087d3479d597';
module.exports = node;
