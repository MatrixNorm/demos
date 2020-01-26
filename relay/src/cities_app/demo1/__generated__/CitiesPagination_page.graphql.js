/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { CitySummary_city$ref } from "./CitySummary_city.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type CitiesPagination_page$ref: FragmentReference;
declare export opaque type CitiesPagination_page$fragmentType: CitiesPagination_page$ref;
export type CitiesPagination_page = {|
  +pageNo: number,
  +hasNextPage: boolean,
  +hasPrevPage: boolean,
  +nodes: ?$ReadOnlyArray<{|
    +$fragmentRefs: CitySummary_city$ref
  |}>,
  +$refType: CitiesPagination_page$ref,
|};
export type CitiesPagination_page$data = CitiesPagination_page;
export type CitiesPagination_page$key = {
  +$data?: CitiesPagination_page$data,
  +$fragmentRefs: CitiesPagination_page$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "CitiesPagination_page",
  "type": "CitiesPagination",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "pageNo",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "hasNextPage",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "hasPrevPage",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "nodes",
      "storageKey": null,
      "args": null,
      "concreteType": "City",
      "plural": true,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "CitySummary_city",
          "args": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '744747c28dc93c4e6c4e23ab0e07abeb';
module.exports = node;
