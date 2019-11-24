/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type AutoComplete_suggestions$ref: FragmentReference;
declare export opaque type AutoComplete_suggestions$fragmentType: AutoComplete_suggestions$ref;
export type AutoComplete_suggestions = {|
  +searchCountries: ?$ReadOnlyArray<string>,
  +$refType: AutoComplete_suggestions$ref,
|};
export type AutoComplete_suggestions$data = AutoComplete_suggestions;
export type AutoComplete_suggestions$key = {
  +$data?: AutoComplete_suggestions$data,
  +$fragmentRefs: AutoComplete_suggestions$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "AutoComplete_suggestions",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "query",
      "type": "String!",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "limit",
      "type": "Int!",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "searchCountries",
      "args": [
        {
          "kind": "Variable",
          "name": "limit",
          "variableName": "limit"
        },
        {
          "kind": "Variable",
          "name": "query",
          "variableName": "query"
        }
      ],
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'b5818967f40e00e2d4adc2290daa4432';
module.exports = node;
