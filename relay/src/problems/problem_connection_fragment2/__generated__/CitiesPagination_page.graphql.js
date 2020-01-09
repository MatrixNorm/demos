/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { City_city$ref } from "./City_city.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type CitiesPagination_page$ref: FragmentReference;
declare export opaque type CitiesPagination_page$fragmentType: CitiesPagination_page$ref;
export type CitiesPagination_page = {|
  +cities: ?{|
    +edges: $ReadOnlyArray<?{|
      +node: {|
        +id: string,
        +$fragmentRefs: City_city$ref,
      |},
      +cursor: string,
    |}>,
    +pageInfo: {|
      +hasNextPage: boolean,
      +endCursor: ?string,
      +hasPreviousPage: boolean,
      +startCursor: ?string,
    |},
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
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": [
          "cities"
        ]
      }
    ]
  },
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
      "alias": "cities",
      "name": "__CitiesPagination_cities_connection",
      "storageKey": null,
      "args": null,
      "concreteType": "CityConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "CityEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "City",
              "plural": false,
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
                  "name": "__typename",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "FragmentSpread",
                  "name": "City_city",
                  "args": null
                }
              ]
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "cursor",
              "args": null,
              "storageKey": null
            }
          ]
        },
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
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '8b1acdb3c1eaf2c24ef36c03724559d2';
module.exports = node;
