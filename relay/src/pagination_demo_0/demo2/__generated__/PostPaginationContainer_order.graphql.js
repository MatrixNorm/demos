/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
export type PostOrderingField = "createdAt" | "viewsCount";
import type { FragmentReference } from "relay-runtime";
declare export opaque type PostPaginationContainer_order$ref: FragmentReference;
declare export opaque type PostPaginationContainer_order$fragmentType: PostPaginationContainer_order$ref;
export type PostPaginationContainer_order = {|
  +activeField: PostOrderingField,
  +configuration: $ReadOnlyArray<{|
    +order: {|
      +field: PostOrderingField,
      +desc: boolean,
    |}
  |}>,
  +$refType: PostPaginationContainer_order$ref,
|};
export type PostPaginationContainer_order$data = PostPaginationContainer_order;
export type PostPaginationContainer_order$key = {
  +$data?: PostPaginationContainer_order$data,
  +$fragmentRefs: PostPaginationContainer_order$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "PostPaginationContainer_order",
  "type": "PostListing",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '93840f198abc31cb055a67f1811a3461';
module.exports = node;
