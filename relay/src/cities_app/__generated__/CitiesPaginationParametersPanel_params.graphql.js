/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type CitiesPaginationParametersPanel_params$ref: FragmentReference;
declare export opaque type CitiesPaginationParametersPanel_params$fragmentType: CitiesPaginationParametersPanel_params$ref;
export type CitiesPaginationParametersPanel_params = {|
  +population_lower_bound: number,
  +population_upper_bound: number,
  +lat_lower_bound: number,
  +lat_upper_bound: number,
  +lng_lower_bound: number,
  +lng_upper_bound: number,
  +$refType: CitiesPaginationParametersPanel_params$ref,
|};
export type CitiesPaginationParametersPanel_params$data = CitiesPaginationParametersPanel_params;
export type CitiesPaginationParametersPanel_params$key = {
  +$data?: CitiesPaginationParametersPanel_params$data,
  +$fragmentRefs: CitiesPaginationParametersPanel_params$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "CitiesPaginationParametersPanel_params",
  "type": "CitiesMetadata",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "population_lower_bound",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "population_upper_bound",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "lat_lower_bound",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "lat_upper_bound",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "lng_lower_bound",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "lng_upper_bound",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'fa45d379d6965abe3427819447416379';
module.exports = node;
