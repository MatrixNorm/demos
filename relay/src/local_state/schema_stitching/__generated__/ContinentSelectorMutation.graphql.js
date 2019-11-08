/**
 * @flow
 * @relayHash 8c154c076b81bebf8e97aff6afbaad54
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type Continent = "Europe" | "NorthAmerica";
export type ContinentSelectorMutationVariables = {|
  continent: Continent
|};
export type ContinentSelectorMutationResponse = {|
  +updateSelectedContinent: ?{|
    +selectedContinent: Continent
  |}
|};
export type ContinentSelectorMutation = {|
  variables: ContinentSelectorMutationVariables,
  response: ContinentSelectorMutationResponse,
|};
*/


/*
mutation ContinentSelectorMutation(
  $continent: Continent!
) {
  updateSelectedContinent(continent: $continent) @local {
    selectedContinent
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "continent",
    "type": "Continent!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "updateSelectedContinent",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "continent",
        "variableName": "continent"
      }
    ],
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
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ContinentSelectorMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ContinentSelectorMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "ContinentSelectorMutation",
    "id": null,
    "text": "mutation ContinentSelectorMutation(\n  $continent: Continent!\n) {\n  updateSelectedContinent(continent: $continent) @local {\n    selectedContinent\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b9b6d53a3cb745ee782cef1b8b78b52f';
module.exports = node;
