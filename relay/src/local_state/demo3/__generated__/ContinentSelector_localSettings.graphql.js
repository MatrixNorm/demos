/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
export type Continent = "Europe" | "NorthAmerica";
import type { FragmentReference } from "relay-runtime";
declare export opaque type ContinentSelector_localSettings$ref: FragmentReference;
declare export opaque type ContinentSelector_localSettings$fragmentType: ContinentSelector_localSettings$ref;
export type ContinentSelector_localSettings = {|
  +allContinents: $ReadOnlyArray<Continent>,
  +selectedContinent: Continent,
  +$refType: ContinentSelector_localSettings$ref,
|};
export type ContinentSelector_localSettings$data = ContinentSelector_localSettings;
export type ContinentSelector_localSettings$key = {
  +$data?: ContinentSelector_localSettings$data,
  +$fragmentRefs: ContinentSelector_localSettings$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "ContinentSelector_localSettings",
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
(node/*: any*/).hash = '02f548cbb367fd8ffe126e4c9c1f2fa6';
module.exports = node;
