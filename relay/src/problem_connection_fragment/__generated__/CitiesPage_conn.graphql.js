/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { City_city$ref } from "./City_city.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type CitiesPage_conn$ref: FragmentReference;
declare export opaque type CitiesPage_conn$fragmentType: CitiesPage_conn$ref;
export type CitiesPage_conn = {|
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
  +$refType: CitiesPage_conn$ref,
|};
export type CitiesPage_conn$data = CitiesPage_conn;
export type CitiesPage_conn$key = {
  +$data?: CitiesPage_conn$data,
  +$fragmentRefs: CitiesPage_conn$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "CitiesPage_conn",
  "type": "CityConnection",
  "metadata": null,
  "argumentDefinitions": [],
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
};
// prettier-ignore
(node/*: any*/).hash = '324b950e0e2cedccd2a66fc1b190d01c';
module.exports = node;
