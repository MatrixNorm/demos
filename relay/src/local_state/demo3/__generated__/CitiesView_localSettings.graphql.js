/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
export type Continent = "Europe" | "NorthAmerica";
import type { FragmentReference } from "relay-runtime";
declare export opaque type CitiesView_localSettings$ref: FragmentReference;
declare export opaque type CitiesView_localSettings$fragmentType: CitiesView_localSettings$ref;
export type CitiesView_localSettings = {|
  +allContinents: $ReadOnlyArray<Continent>,
  +selectedContinent: Continent,
  +$refType: CitiesView_localSettings$ref,
|};
export type CitiesView_localSettings$data = CitiesView_localSettings;
export type CitiesView_localSettings$key = {
  +$data?: CitiesView_localSettings$data,
  +$fragmentRefs: CitiesView_localSettings$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "CitiesView_localSettings",
  "type": "LocalSettings",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "allContinents",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "selectedContinent",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '7c870e2d97d8310d3f4be3ae267df438';
module.exports = node;
