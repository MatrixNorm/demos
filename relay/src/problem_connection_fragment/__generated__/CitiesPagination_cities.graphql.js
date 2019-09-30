/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { CitiesList_conn$ref } from "./CitiesList_conn.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type CitiesPagination_cities$ref: FragmentReference;
declare export opaque type CitiesPagination_cities$fragmentType: CitiesPagination_cities$ref;
export type CitiesPagination_cities = {|
  +cities: ?{|
    +$fragmentRefs: CitiesList_conn$ref
  |},
  +$refType: CitiesPagination_cities$ref,
|};
export type CitiesPagination_cities$data = CitiesPagination_cities;
export type CitiesPagination_cities$key = {
  +$data?: CitiesPagination_cities$data,
  +$fragmentRefs: CitiesPagination_cities$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "CitiesPagination_cities",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "first",
      "type": "Int",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "after",
      "type": "String",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "cities",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "after",
          "variableName": "after"
        },
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first"
        }
      ],
      "concreteType": "CityConnection",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "CitiesList_conn",
          "args": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '493d97990ce44d06b1d5fcbb7deb6467';
module.exports = node;
