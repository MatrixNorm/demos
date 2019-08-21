/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type PostDetails_post$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type PostSequence_posts$ref: FragmentReference;
declare export opaque type PostSequence_posts$fragmentType: PostSequence_posts$ref;
export type PostSequence_posts = {|
  +edges: ?$ReadOnlyArray<?{|
    +node: ?{|
      +$fragmentRefs: PostDetails_post$ref
    |}
  |}>,
  +$refType: PostSequence_posts$ref,
|};
export type PostSequence_posts$data = PostSequence_posts;
export type PostSequence_posts$key = {
  +$data?: PostSequence_posts$data,
  +$fragmentRefs: PostSequence_posts$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "PostSequence_posts",
  "type": "PostConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "PostEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "Post",
          "plural": false,
          "selections": [
            {
              "kind": "FragmentSpread",
              "name": "PostDetails_post",
              "args": null
            }
          ]
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'bfe8decb85dc51f4b3add3e78b066d59';
module.exports = node;
