/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type PostDetails_post$ref: FragmentReference;
declare export opaque type PostDetails_post$fragmentType: PostDetails_post$ref;
export type PostDetails_post = {|
  +title: ?string,
  +author: ?{|
    +name: ?string
  |},
  +$refType: PostDetails_post$ref,
|};
export type PostDetails_post$data = PostDetails_post;
export type PostDetails_post$key = {
  +$data?: PostDetails_post$data,
  +$fragmentRefs: PostDetails_post$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "PostDetails_post",
  "type": "Post",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "author",
      "storageKey": null,
      "args": null,
      "concreteType": "User",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'e99a51709a712e320863baf7bae43663';
module.exports = node;
