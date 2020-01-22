/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { SearchParameters_metadata$ref } from "./SearchParameters_metadata.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type CitiesBrowserPanel_searchMetadata$ref: FragmentReference;
declare export opaque type CitiesBrowserPanel_searchMetadata$fragmentType: CitiesBrowserPanel_searchMetadata$ref;
export type CitiesBrowserPanel_searchMetadata = {|
  +citiesMetadata: ?{|
    +$fragmentRefs: SearchParameters_metadata$ref
  |},
  +$refType: CitiesBrowserPanel_searchMetadata$ref,
|};
export type CitiesBrowserPanel_searchMetadata$data = CitiesBrowserPanel_searchMetadata;
export type CitiesBrowserPanel_searchMetadata$key = {
  +$data?: CitiesBrowserPanel_searchMetadata$data,
  +$fragmentRefs: CitiesBrowserPanel_searchMetadata$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "CitiesBrowserPanel_searchMetadata",
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
          "kind": "FragmentSpread",
          "name": "SearchParameters_metadata",
          "args": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '7ab3363c9f674b7506f2efc60ce4169f';
module.exports = node;
