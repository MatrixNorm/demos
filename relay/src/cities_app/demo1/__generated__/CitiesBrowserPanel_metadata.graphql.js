/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type CitiesBrowserPanel_metadata$ref: FragmentReference;
declare export opaque type CitiesBrowserPanel_metadata$fragmentType: CitiesBrowserPanel_metadata$ref;
export type CitiesBrowserPanel_metadata = {|
  +citiesMetadata: ?{|
    +populationLowerBound: number,
    +populationUpperBound: number,
  |},
  +$refType: CitiesBrowserPanel_metadata$ref,
|};
export type CitiesBrowserPanel_metadata$data = CitiesBrowserPanel_metadata;
export type CitiesBrowserPanel_metadata$key = {
  +$data?: CitiesBrowserPanel_metadata$data,
  +$fragmentRefs: CitiesBrowserPanel_metadata$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "CitiesBrowserPanel_metadata",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "citiesMetadata",
      "storageKey": null,
      "args": null,
      "concreteType": "CitiesMetadata",
      "plural": false,
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
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'f1d5c9887bab3a285282a37adb238235';
module.exports = node;
