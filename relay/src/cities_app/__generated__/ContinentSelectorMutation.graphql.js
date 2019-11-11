/**
 * @flow
 * @relayHash 6ee4b13515974e1126688120f159984d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type Continent = "Europe" | "NorthAmerica";
export type UpdateSelectedContinentInput = {|
  continent: Continent,
  clientMutationId?: ?string,
|};
export type ContinentSelectorMutationVariables = {|
  input: UpdateSelectedContinentInput
|};
export type ContinentSelectorMutationResponse = {|
  +updateSelectedContinent: {|
    +continent: Continent,
    +clientMutationId: ?string,
  |}
|};
export type ContinentSelectorMutation = {|
  variables: ContinentSelectorMutationVariables,
  response: ContinentSelectorMutationResponse,
|};
*/


/*
mutation ContinentSelectorMutation(
  $input: UpdateSelectedContinentInput!
) {
  updateSelectedContinent(input: $input) {
    continent
    clientMutationId
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "UpdateSelectedContinentInput!",
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
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateSelectedContinentPayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "continent",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "clientMutationId",
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
    "text": "mutation ContinentSelectorMutation(\n  $input: UpdateSelectedContinentInput!\n) {\n  updateSelectedContinent(input: $input) {\n    continent\n    clientMutationId\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '92349f059eb532d5b55a64ea68bb700f';
module.exports = node;
