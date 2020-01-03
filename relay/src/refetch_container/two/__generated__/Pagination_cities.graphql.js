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
  +nodes: ?$ReadOnlyArray<{|
    +id: string,
    +name: string,
    +population: number,
  |}>,
  +pageNo: number,
  +hasNextPage: boolean,
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
  "type": "CityPagination",
  "metadata": null,
  "argumentDefinitions": [],
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
};
// prettier-ignore
(node/*: any*/).hash = '92d6cdd9356099dbe579cba304ea2e35';
module.exports = node;
