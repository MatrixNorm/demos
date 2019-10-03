/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type City_city$ref: FragmentReference;
declare export opaque type City_city$fragmentType: City_city$ref;
export type City_city = {|
  +name: string,
  +lat: number,
  +lng: number,
  +$refType: City_city$ref,
|};
export type City_city$data = City_city;
export type City_city$key = {
  +$data?: City_city$data,
  +$fragmentRefs: City_city$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "City_city",
  "type": "City",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
      "name": "lat",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "lng",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '6c11fc3413543e04c9047155576d140f';
module.exports = node;
