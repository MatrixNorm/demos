/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type PostDetails_post$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type PostFeed_posts$ref: FragmentReference;
declare export opaque type PostFeed_posts$fragmentType: PostFeed_posts$ref;
export type PostFeed_posts = {|
  +postFeed: ?{|
    +edges: $ReadOnlyArray<?{|
      +node: ?{|
        +$fragmentRefs: PostDetails_post$ref
      |}
    |}>,
    +pageInfo: {|
      +hasNextPage: boolean,
      +endCursor: ?string,
    |},
  |},
  +$refType: PostFeed_posts$ref,
|};
export type PostFeed_posts$data = PostFeed_posts;
export type PostFeed_posts$key = {
  +$data?: PostFeed_posts$data,
  +$fragmentRefs: PostFeed_posts$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "PostFeed_posts",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "first",
      "type": "Int!",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "after",
      "type": "String",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "postFeed",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "after",
          "variableName": "after"
        },
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first"
        }
      ],
      "concreteType": "PostConnection",
      "plural": false,
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
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "pageInfo",
          "storageKey": null,
          "args": null,
          "concreteType": "PageInfo",
          "plural": false,
          "selections": [
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
              "name": "endCursor",
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
(node/*: any*/).hash = '98833e3dd3a769be4f4115e79391d962';
module.exports = node;
