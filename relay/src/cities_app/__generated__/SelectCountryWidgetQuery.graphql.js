/**
 * @flow
 * @relayHash 7412567a9060b8408a9a11a78c59679b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SelectCountryWidgetQueryVariables = {|
  searchString?: ?string
|};
export type SelectCountryWidgetQueryResponse = {|
  +countries: ?$ReadOnlyArray<string>
|};
export type SelectCountryWidgetQuery = {|
  variables: SelectCountryWidgetQueryVariables,
  response: SelectCountryWidgetQueryResponse,
|};
*/


/*
query SelectCountryWidgetQuery(
  $searchString: String
) {
  countries(searchString: $searchString)
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "searchString",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "countries",
    "args": [
      {
        "kind": "Variable",
        "name": "searchString",
        "variableName": "searchString"
      }
    ],
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "SelectCountryWidgetQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "SelectCountryWidgetQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "SelectCountryWidgetQuery",
    "id": null,
    "text": "query SelectCountryWidgetQuery(\n  $searchString: String\n) {\n  countries(searchString: $searchString)\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2a260e8e2ec37b83aa6c3336ded62ff3';
module.exports = node;
