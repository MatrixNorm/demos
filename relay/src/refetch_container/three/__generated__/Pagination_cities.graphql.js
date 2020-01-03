/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Pagination_cities$ref: FragmentReference;
declare export opaque type Pagination_cities$fragmentType: Pagination_cities$ref;
export type Pagination_cities = {|
  +cities: ?{|
    +nodes: ?$ReadOnlyArray<{|
      +id: string,
      +name: string,
      +population: number,
    |}>,
    +pageNo: number,
    +hasNextPage: boolean,
  |},
  +$refType: Pagination_cities$ref,
|};
export type Pagination_cities$data = Pagination_cities;
export type Pagination_cities$key = {
  +$data?: Pagination_cities$data,
  +$fragmentRefs: Pagination_cities$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "Pagination_cities",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [
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
      "name": "cities",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "pageNo",
          "variableName": "pageNo"
        }
      ],
      "concreteType": "CityPagination",
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
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'a611df1d167615fd174152fa925d1dfb';
module.exports = node;
