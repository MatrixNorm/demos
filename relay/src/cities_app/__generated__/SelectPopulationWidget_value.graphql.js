/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type SelectPopulationWidget_value$ref: FragmentReference;
declare export opaque type SelectPopulationWidget_value$fragmentType: SelectPopulationWidget_value$ref;
export type SelectPopulationWidget_value = {|
  +populationUpper: ?number,
  +populationLower: ?number,
  +$refType: SelectPopulationWidget_value$ref,
|};
export type SelectPopulationWidget_value$data = SelectPopulationWidget_value;
export type SelectPopulationWidget_value$key = {
  +$data?: SelectPopulationWidget_value$data,
  +$fragmentRefs: SelectPopulationWidget_value$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "SelectPopulationWidget_value",
  "type": "UICitySearchParams",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "populationUpper",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "populationLower",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '4c3f0e83171048d2a2108422811473be';
module.exports = node;
