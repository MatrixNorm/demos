/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
export type PostOrderingFields = "createdAt" | "viewsCount";
import type { FragmentReference } from "relay-runtime";
declare export opaque type OrderSelector_state$ref: FragmentReference;
declare export opaque type OrderSelector_state$fragmentType: OrderSelector_state$ref;
export type OrderSelector_state = {|
  +activeField: ?PostOrderingFields,
  +allOrderings: $ReadOnlyArray<{|
    +field: PostOrderingFields,
    +desc: boolean,
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
  "type": "PostListingState",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ClientExtension",
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
          "name": "allOrderings",
          "storageKey": null,
          "args": null,
          "concreteType": "PostOrdering",
          "plural": true,
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
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '9aad39de2bb2ff5c203f3688a07c9d3b';
module.exports = node;
