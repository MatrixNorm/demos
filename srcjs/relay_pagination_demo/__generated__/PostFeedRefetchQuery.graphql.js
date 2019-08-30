/**
 * @flow
 * @relayHash 72e33a4d61695dc0cf92c169e7b4c6c1
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type PostFeed_posts$ref = any;
export type PostFeedRefetchQueryVariables = {|
  first: number,
  after?: ?string,
|};
export type PostFeedRefetchQueryResponse = {|
  +$fragmentRefs: PostFeed_posts$ref
|};
export type PostFeedRefetchQuery = {|
  variables: PostFeedRefetchQueryVariables,
  response: PostFeedRefetchQueryResponse,
|};
*/


/*
query PostFeedRefetchQuery(
  $first: Int!
  $after: String
) {
  ...PostFeed_posts_2HEEH6
}

fragment PostFeed_posts_2HEEH6 on Query {
  postFeed(first: $first, after: $after) {
    edges {
      node {
        ...PostDetails_post
        id
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}

fragment PostDetails_post on Post {
  title
  author {
    name
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
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
v1 = [
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
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "PostFeedRefetchQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "PostFeed_posts",
        "args": (v1/*: any*/)
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "PostFeedRefetchQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "postFeed",
        "storageKey": null,
        "args": (v1/*: any*/),
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
                      },
                      (v2/*: any*/)
                    ]
                  },
                  (v2/*: any*/)
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
  },
  "params": {
    "operationKind": "query",
    "name": "PostFeedRefetchQuery",
    "id": null,
    "text": "query PostFeedRefetchQuery(\n  $first: Int!\n  $after: String\n) {\n  ...PostFeed_posts_2HEEH6\n}\n\nfragment PostFeed_posts_2HEEH6 on Query {\n  postFeed(first: $first, after: $after) {\n    edges {\n      node {\n        ...PostDetails_post\n        id\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment PostDetails_post on Post {\n  title\n  author {\n    name\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '72825e8da4ea6d114c853c0b056f3ff9';
module.exports = node;
