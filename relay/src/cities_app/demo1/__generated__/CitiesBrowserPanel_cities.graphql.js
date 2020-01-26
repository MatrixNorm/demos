/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { CitiesPagination_page$ref } from "./CitiesPagination_page.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type CitiesBrowserPanel_cities$ref: FragmentReference;
declare export opaque type CitiesBrowserPanel_cities$fragmentType: CitiesBrowserPanel_cities$ref;
export type CitiesBrowserPanel_cities = {|
  +citiesPagination: ?{|
    +$fragmentRefs: CitiesPagination_page$ref
  |},
  +$refType: CitiesBrowserPanel_cities$ref,
|};
export type CitiesBrowserPanel_cities$data = CitiesBrowserPanel_cities;
export type CitiesBrowserPanel_cities$key = {
  +$data?: CitiesBrowserPanel_cities$data,
  +$fragmentRefs: CitiesBrowserPanel_cities$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "CitiesBrowserPanel_cities",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "pageNo",
      "type": "Int!",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "pageSize",
      "type": "Int!",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "searchParams",
      "type": "CitySearchParamsInput",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "citiesPagination",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "pageNo",
          "variableName": "pageNo"
        },
        {
          "kind": "Variable",
          "name": "pageSize",
          "variableName": "pageSize"
        },
        {
          "kind": "Variable",
          "name": "searchParams",
          "variableName": "searchParams"
        }
      ],
      "concreteType": "CitiesPagination",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "CitiesPagination_page",
          "args": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '4425a9e4a5212f8cf67ca817b3e31c42';
module.exports = node;
