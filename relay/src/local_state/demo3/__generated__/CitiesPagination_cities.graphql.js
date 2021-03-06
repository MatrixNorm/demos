/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type CitiesPagination_cities$ref: FragmentReference;
declare export opaque type CitiesPagination_cities$fragmentType: CitiesPagination_cities$ref;
export type CitiesPagination_cities = {|
  +citiesPagination: ?{|
    +nodes: ?$ReadOnlyArray<{|
      +id: string,
      +name: string,
      +population: string,
    |}>,
    +hasNextPage: boolean,
    +hasPrevPage: boolean,
    +pageNo: number,
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
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "continent",
      "type": "Continent!",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "pageNo",
      "type": "Int!",
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
          "name": "continent",
          "variableName": "continent"
        },
        {
          "kind": "Variable",
          "name": "pageNo",
          "variableName": "pageNo"
        }
      ],
      "concreteType": "CitiesPagination",
      "plural": false,
      "selections": [
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
              "kind": "ScalarField",
              "alias": null,
              "name": "id",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "name",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "population",
              "args": null,
              "storageKey": null
            }
          ]
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
          "kind": "ScalarField",
          "alias": null,
          "name": "pageNo",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '9fd9a80914b23154103538203ff68217';
module.exports = node;
