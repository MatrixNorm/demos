/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type SelectPopulationWidget_meta$ref: FragmentReference;
declare export opaque type SelectPopulationWidget_meta$fragmentType: SelectPopulationWidget_meta$ref;
export type SelectPopulationWidget_meta = {|
  +populationLowerBound: number,
  +populationUpperBound: number,
  +$refType: SelectPopulationWidget_meta$ref,
|};
export type SelectPopulationWidget_meta$data = SelectPopulationWidget_meta;
export type SelectPopulationWidget_meta$key = {
  +$data?: SelectPopulationWidget_meta$data,
  +$fragmentRefs: SelectPopulationWidget_meta$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "SelectPopulationWidget_meta",
  "type": "CitiesMetadata",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "populationLowerBound",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "populationUpperBound",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '0a380d2cd81361f58898e58b62a97bda';
module.exports = node;
