/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type CitiesPaginationListingPanel_cities$ref: FragmentReference;
declare export opaque type CitiesPaginationListingPanel_cities$fragmentType: CitiesPaginationListingPanel_cities$ref;
export type CitiesPaginationListingPanel_cities = {|
  +nodes: ?$ReadOnlyArray<{|
    +id: string,
    +name: string,
    +country: string,
    +population: number,
    +lat: number,
    +lng: number,
  |}>,
  +pageNo: number,
  +hasNextPage: boolean,
  +hasPrevPage: boolean,
  +$refType: CitiesPaginationListingPanel_cities$ref,
|};
export type CitiesPaginationListingPanel_cities$data = CitiesPaginationListingPanel_cities;
export type CitiesPaginationListingPanel_cities$key = {
  +$data?: CitiesPaginationListingPanel_cities$data,
  +$fragmentRefs: CitiesPaginationListingPanel_cities$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "CitiesPaginationListingPanel_cities",
  "type": "CitiesPagination",
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
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'd721d4c8bbb7998f0a7dd7461445c912';
module.exports = node;
