/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { City_city$ref } from "./City_city.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type CityList_cities$ref: FragmentReference;
declare export opaque type CityList_cities$fragmentType: CityList_cities$ref;
export type CityList_cities = {|
  +edges: $ReadOnlyArray<?{|
    +node: {|
      +id: string,
      +$fragmentRefs: City_city$ref,
    |},
    +cursor: string,
  |}>,
  +$refType: CityList_cities$ref,
|};
export type CityList_cities$data = CityList_cities;
export type CityList_cities$key = {
  +$data?: CityList_cities$data,
  +$fragmentRefs: CityList_cities$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "CityList_cities",
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
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'f99a492cf397f193e89c4884eb52bbdf';
module.exports = node;
