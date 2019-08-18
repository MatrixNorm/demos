/**
 * @flow
 * @relayHash 549376ad4ac521d2a795c39fa38b8f78
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type PostDetails_post$ref = any;
export type mainQueryVariables = {|
  postId: string
|};
export type mainQueryResponse = {|
  +post: ?{|
    +$fragmentRefs: PostDetails_post$ref
  |}
|};
export type mainQuery = {|
  variables: mainQueryVariables,
  response: mainQueryResponse,
|};
*/


/*
query mainQuery(
  $postId: ID!
) {
  post(id: $postId) {
    ...PostDetails_post
    id
  }
}

fragment PostDetails_post on Post {
  id
  title
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "postId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "postId"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "mainQuery",
    "type": "Root",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "post",
        "storageKey": null,
        "args": (v1/*: any*/),
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
  "operation": {
    "kind": "Operation",
    "name": "mainQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "post",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
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
            "kind": "ScalarField",
            "alias": null,
            "name": "title",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "mainQuery",
    "id": null,
    "text": "query mainQuery(\n  $postId: ID!\n) {\n  post(id: $postId) {\n    ...PostDetails_post\n    id\n  }\n}\n\nfragment PostDetails_post on Post {\n  id\n  title\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2a72913a099682067cede7aba2d49a29';
module.exports = node;
