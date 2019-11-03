/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
export type Continent = "Europe" | "NorthAmerica";
import type { FragmentReference } from "relay-runtime";
declare export opaque type CitiesListView_localSettings$ref: FragmentReference;
declare export opaque type CitiesListView_localSettings$fragmentType: CitiesListView_localSettings$ref;
export type CitiesListView_localSettings = {|
  +selectedContinent: Continent,
  +$refType: CitiesListView_localSettings$ref,
|};
export type CitiesListView_localSettings$data = CitiesListView_localSettings;
export type CitiesListView_localSettings$key = {
  +$data?: CitiesListView_localSettings$data,
  +$fragmentRefs: CitiesListView_localSettings$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "CitiesListView_localSettings",
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
          "name": "selectedContinent",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '1506805036e7c1fab2b8497ac40ef562';
module.exports = node;
