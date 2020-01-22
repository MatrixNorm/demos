/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type SearchParameters_metadata$ref: FragmentReference;
declare export opaque type SearchParameters_metadata$fragmentType: SearchParameters_metadata$ref;
export type SearchParameters_metadata = {|
  +populationLowerBound: number,
  +populationUpperBound: number,
  +$refType: SearchParameters_metadata$ref,
|};
export type SearchParameters_metadata$data = SearchParameters_metadata;
export type SearchParameters_metadata$key = {
  +$data?: SearchParameters_metadata$data,
  +$fragmentRefs: SearchParameters_metadata$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "SearchParameters_metadata",
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
(node/*: any*/).hash = 'a0b54aba36d1143129d0738601707c39';
module.exports = node;
