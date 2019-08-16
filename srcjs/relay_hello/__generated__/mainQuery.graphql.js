/**
 * @flow
 * @relayHash e37bda1cadaf17be64c37663a6997594
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type PostDetails_post$ref = any;
export type mainQueryVariables = {||};
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
query mainQuery {
  post {
    ...PostDetails_post
    id
  }
}

fragment PostDetails_post on Post {
  id
  title
}
*/

const node/*: ConcreteRequest*/ = {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "mainQuery",
    "type": "Root",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "post",
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
  "operation": {
    "kind": "Operation",
    "name": "mainQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "post",
        "storageKey": null,
        "args": null,
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
    "text": "query mainQuery {\n  post {\n    ...PostDetails_post\n    id\n  }\n}\n\nfragment PostDetails_post on Post {\n  id\n  title\n}\n",
    "metadata": {}
  }
};
// prettier-ignore
(node/*: any*/).hash = '813916505b58d2388800a830d255f5d2';
module.exports = node;
