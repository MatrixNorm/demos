/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
export type PostOrderingField = "createdAt" | "viewsCount";
import type { FragmentReference } from "relay-runtime";
declare export opaque type OrderSelector_state$ref: FragmentReference;
declare export opaque type OrderSelector_state$fragmentType: OrderSelector_state$ref;
export type OrderSelector_state = {|
  +id: string,
  +activeField: PostOrderingField,
  +configuration: $ReadOnlyArray<{|
    +order: {|
      +field: PostOrderingField,
      +desc: boolean,
    |},
    +fieldDescription_ASC: string,
    +fieldDescription_DESC: string,
  |}>,
  +$refType: OrderSelector_state$ref,
|};
export type OrderSelector_state$data = OrderSelector_state;
export type OrderSelector_state$key = {
  +$data?: OrderSelector_state$data,
  +$fragmentRefs: OrderSelector_state$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "OrderSelector_state",
  "type": "PostListing",
  "metadata": null,
  "argumentDefinitions": [],
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
      "name": "activeField",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "configuration",
      "storageKey": null,
      "args": null,
      "concreteType": "PostListingOrdering",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "order",
          "storageKey": null,
          "args": null,
          "concreteType": "PostOrdering",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "field",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "desc",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "fieldDescription_ASC",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "fieldDescription_DESC",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '67bc489ef0c2195bda38f2ee320a90ae';
module.exports = node;
