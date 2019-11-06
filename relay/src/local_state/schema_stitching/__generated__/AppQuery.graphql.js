/**
 * @flow
 * @relayHash a9f294b0fbdf6e3d321096a213af97d0
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { ContinentSelector_localSettings$ref } from "./ContinentSelector_localSettings.graphql";
export type AppQueryVariables = {||};
export type AppQueryResponse = {|
  +localSettings: {|
    +$fragmentRefs: ContinentSelector_localSettings$ref
  |},
  +test: string,
|};
export type AppQuery = {|
  variables: AppQueryVariables,
  response: AppQueryResponse,
|};
*/


/*
query AppQuery {
  localSettings {
    ...ContinentSelector_localSettings
  }
  test
}

fragment ContinentSelector_localSettings on LocalSettings {
  allContinents
  selectedContinent
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "test",
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
          }
        ]
      },
      (v0/*: any*/)
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AppQuery",
    "argumentDefinitions": [],
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
      },
      (v0/*: any*/)
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "AppQuery",
    "id": null,
    "text": "query AppQuery {\n  localSettings {\n    ...ContinentSelector_localSettings\n  }\n  test\n}\n\nfragment ContinentSelector_localSettings on LocalSettings {\n  allContinents\n  selectedContinent\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '96a51c918e97adebee0ea7dcb28f8a32';
module.exports = node;
