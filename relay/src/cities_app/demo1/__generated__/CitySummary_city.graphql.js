/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type CitySummary_city$ref: FragmentReference;
declare export opaque type CitySummary_city$fragmentType: CitySummary_city$ref;
export type CitySummary_city = {|
  +id: string,
  +name: string,
  +country: string,
  +population: number,
  +$refType: CitySummary_city$ref,
|};
export type CitySummary_city$data = CitySummary_city;
export type CitySummary_city$key = {
  +$data?: CitySummary_city$data,
  +$fragmentRefs: CitySummary_city$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "CitySummary_city",
  "type": "City",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "country",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "population",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '29351542270b0d3087c203ca5b009f50';
module.exports = node;
