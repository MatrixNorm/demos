/**
 * @flow
 * @relayHash b9c3e6b89fb2d6a3a20b79c44906c781
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { CitiesListView_localSettings$ref } from "./CitiesListView_localSettings.graphql";
import type { ContinentSelector_localSettings$ref } from "./ContinentSelector_localSettings.graphql";
export type CitiesListPageQueryVariables = {||};
export type CitiesListPageQueryResponse = {|
  +localSettings: {|
    +id: string,
    +$fragmentRefs: ContinentSelector_localSettings$ref & CitiesListView_localSettings$ref,
  |}
|};
export type CitiesListPageQuery = {|
  variables: CitiesListPageQueryVariables,
  response: CitiesListPageQueryResponse,
|};
*/


/*
query CitiesListPageQuery {
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
    "name": "CitiesListPageQuery",
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
    "name": "CitiesListPageQuery",
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
    "name": "CitiesListPageQuery",
    "id": null,
    "text": "query CitiesListPageQuery {\n  localSettings {\n    id\n    ...ContinentSelector_localSettings\n    ...CitiesListView_localSettings\n  }\n}\n\nfragment CitiesListView_localSettings on LocalSettings {\n  selectedContinent\n}\n\nfragment ContinentSelector_localSettings on LocalSettings {\n  allContinents\n  selectedContinent\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9e8231b8ebd247652bbc9e24ad7b3cc6';
module.exports = node;
