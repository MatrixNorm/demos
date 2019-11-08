/**
 * @flow
 * @relayHash dc730bd1f2165ef7c7d7b2a9245fe884
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
  +updateSelectedContinent: Continent
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
  updateSelectedContinent(continent: $continent) @local
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
    "kind": "ScalarField",
    "alias": null,
    "name": "updateSelectedContinent",
    "args": [
      {
        "kind": "Variable",
        "name": "continent",
        "variableName": "continent"
      }
    ],
    "storageKey": null
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
    "text": "mutation ContinentSelectorMutation(\n  $continent: Continent!\n) {\n  updateSelectedContinent(continent: $continent) @local\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c7315366c068e66e54b0ec8717b873d7';
module.exports = node;
