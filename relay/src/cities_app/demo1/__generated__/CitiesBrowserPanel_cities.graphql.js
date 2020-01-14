/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type CitiesBrowserPanel_cities$ref: FragmentReference;
declare export opaque type CitiesBrowserPanel_cities$fragmentType: CitiesBrowserPanel_cities$ref;
export type CitiesBrowserPanel_cities = {|
  +citiesPagination: ?{|
    +nodes: ?$ReadOnlyArray<{|
      +id: string,
      +name: string,
      +country: string,
      +population: number,
      +lat: number,
      +lng: number,
    |}>,
    +hasNextPage: boolean,
    +hasPrevPage: boolean,
    +pageNo: number,
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
              "name": "country",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "population",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "lat",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "lng",
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
(node/*: any*/).hash = '1cf70be8a08c0bf8a68017ec2b09806d';
module.exports = node;
