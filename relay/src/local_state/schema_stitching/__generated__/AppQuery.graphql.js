/**
 * @flow
 * @relayHash 093fbf5ec32b049cfdc2d375c3ff4374
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type Continent = "Europe" | "NorthAmerica";
export type AppQueryVariables = {||};
export type AppQueryResponse = {|
  +localSettings: {|
    +selectedContinent: Continent
  |},
  +foo: string,
|};
export type AppQuery = {|
  variables: AppQueryVariables,
  response: AppQueryResponse,
|};
*/


/*
query AppQuery {
  localSettings {
    selectedContinent
  }
  foo
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
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
        "name": "selectedContinent",
        "args": null,
        "storageKey": null
      }
    ]
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "foo",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AppQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "AppQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "AppQuery",
    "id": null,
    "text": "query AppQuery {\n  localSettings {\n    selectedContinent\n  }\n  foo\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '6029a74645ae96b42b2d0fa1bdd46c6a';
module.exports = node;
