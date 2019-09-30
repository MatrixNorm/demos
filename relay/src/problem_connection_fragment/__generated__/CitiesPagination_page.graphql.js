/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { CityList_cities$ref } from "./CityList_cities.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type CitiesPagination_page$ref: FragmentReference;
declare export opaque type CitiesPagination_page$fragmentType: CitiesPagination_page$ref;
export type CitiesPagination_page = {|
  +cities: ?{|
    +pageInfo: {|
      +hasNextPage: boolean,
      +endCursor: ?string,
      +hasPreviousPage: boolean,
      +startCursor: ?string,
    |},
    +$fragmentRefs: CityList_cities$ref,
  |},
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
          "kind": "LinkedField",
          "alias": null,
          "name": "pageInfo",
          "storageKey": null,
          "args": null,
          "concreteType": "PageInfo",
          "plural": false,
          "selections": [
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
              "name": "endCursor",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "hasPreviousPage",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "startCursor",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "FragmentSpread",
          "name": "CityList_cities",
          "args": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '2e2bc09d874745acc7d3e68722465047';
module.exports = node;
