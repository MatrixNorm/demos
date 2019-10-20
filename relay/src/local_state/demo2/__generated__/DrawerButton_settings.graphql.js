/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type DrawerButton_settings$ref: FragmentReference;
declare export opaque type DrawerButton_settings$fragmentType: DrawerButton_settings$ref;
export type DrawerButton_settings = {|
  +isDrawerOpen: boolean,
  +$refType: DrawerButton_settings$ref,
|};
export type DrawerButton_settings$data = DrawerButton_settings;
export type DrawerButton_settings$key = {
  +$data?: DrawerButton_settings$data,
  +$fragmentRefs: DrawerButton_settings$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "DrawerButton_settings",
  "type": "Settings",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "isDrawerOpen",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '4fb0756f6ab84e2c5c3c80cc925d4d7f';
module.exports = node;
