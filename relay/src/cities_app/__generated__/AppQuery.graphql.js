/**
 * @flow
 * @relayHash 0529f1494423e0d1e703bcef514f5053
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
    +id: string,
    +$fragmentRefs: ContinentSelector_localSettings$ref & CitiesListView_localSettings$ref,
  |}
|};
export type AppQuery = {|
  variables: AppQueryVariables,
  response: AppQueryResponse,
|};
*/


/*
query AppQuery {
  localSettings {
    id
    ...ContinentSelector_localSettings
    ...CitiesListView_localSettings
  }
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
  "name": "id",
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
          (v0/*: any*/),
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
          (v0/*: any*/),
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
  },
  "params": {
    "operationKind": "query",
    "name": "AppQuery",
    "id": null,
    "text": "query AppQuery {\n  localSettings {\n    id\n    ...ContinentSelector_localSettings\n    ...CitiesListView_localSettings\n  }\n}\n\nfragment CitiesListView_localSettings on LocalSettings {\n  selectedContinent\n}\n\nfragment ContinentSelector_localSettings on LocalSettings {\n  allContinents\n  selectedContinent\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a4a722ae6e5f08e90f9e02e4baf5c05c';
module.exports = node;
