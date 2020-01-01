/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type SelectCountryWidget_value$ref: FragmentReference;
declare export opaque type SelectCountryWidget_value$fragmentType: SelectCountryWidget_value$ref;
export type SelectCountryWidget_value = {|
  +country: ?string,
  +$refType: SelectCountryWidget_value$ref,
|};
export type SelectCountryWidget_value$data = SelectCountryWidget_value;
export type SelectCountryWidget_value$key = {
  +$data?: SelectCountryWidget_value$data,
  +$fragmentRefs: SelectCountryWidget_value$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "SelectCountryWidget_value",
  "type": "UICitySearchParams",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "country",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '67422c8d887aa3976584a3a8053a1bbf';
module.exports = node;
