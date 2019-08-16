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
  +id: string,
  +title: string,
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
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '0831d80dc06e5a943e2e968603bddc1a';
module.exports = node;
