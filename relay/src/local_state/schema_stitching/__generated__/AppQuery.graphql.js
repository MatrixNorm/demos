/**
 * @flow
 * @relayHash d6c5f3482665bb6146c069e3d356b5b9
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { CitiesListView_localSettings$ref } from "./CitiesListView_localSettings.graphql";
import type { ContinentSelector_localSettings$ref } from "./ContinentSelector_localSettings.graphql";
export type AppQueryVariables = {||};
export type AppQueryResponse = {|
  +localSettings: {|
    +$fragmentRefs: ContinentSelector_localSettings$ref & CitiesListView_localSettings$ref
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
    ...CitiesListView_localSettings
  }
  test
}

fragment CitiesListView_localSettings on LocalSettings {
  selectedContinent
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
          },
          {
            "kind": "FragmentSpread",
            "name": "CitiesListView_localSettings",
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
    "text": "query AppQuery {\n  localSettings {\n    ...ContinentSelector_localSettings\n    ...CitiesListView_localSettings\n  }\n  test\n}\n\nfragment CitiesListView_localSettings on LocalSettings {\n  selectedContinent\n}\n\nfragment ContinentSelector_localSettings on LocalSettings {\n  allContinents\n  selectedContinent\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0dcba13dcab92c1b0030c5a5119e9e9d';
module.exports = node;
