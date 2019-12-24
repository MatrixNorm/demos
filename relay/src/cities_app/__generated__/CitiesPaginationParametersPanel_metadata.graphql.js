/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type CitiesPaginationParametersPanel_metadata$ref: FragmentReference;
declare export opaque type CitiesPaginationParametersPanel_metadata$fragmentType: CitiesPaginationParametersPanel_metadata$ref;
export type CitiesPaginationParametersPanel_metadata = {|
  +populationLowerBound: number,
  +populationUpperBound: number,
  +latLowerBound: number,
  +latUpperBound: number,
  +lngLowerBound: number,
  +lngUpperBound: number,
  +$refType: CitiesPaginationParametersPanel_metadata$ref,
|};
export type CitiesPaginationParametersPanel_metadata$data = CitiesPaginationParametersPanel_metadata;
export type CitiesPaginationParametersPanel_metadata$key = {
  +$data?: CitiesPaginationParametersPanel_metadata$data,
  +$fragmentRefs: CitiesPaginationParametersPanel_metadata$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "CitiesPaginationParametersPanel_metadata",
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
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "latLowerBound",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "latUpperBound",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "lngLowerBound",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "lngUpperBound",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'e9839dffb23a44c455dc007b73b34a73';
module.exports = node;
