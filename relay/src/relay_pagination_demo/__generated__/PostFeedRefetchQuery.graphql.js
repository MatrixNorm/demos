/**
 * @flow
 * @relayHash ed81f940a74adface81aa6f4d3de4588
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type PostFeed_xxx$ref = any;
export type PostOrderingFields = "createdAt" | "viewsCount" | "%future added value";
export type PostOrdering = {|
  field: PostOrderingFields,
  desc?: ?boolean,
|};
export type PostFeedRefetchQueryVariables = {|
  first?: ?number,
  after?: ?string,
  last?: ?number,
  before?: ?string,
  orderBy?: ?PostOrdering,
|};
export type PostFeedRefetchQueryResponse = {|
  +xxx: ?{|
    +$fragmentRefs: PostFeed_xxx$ref
  |}
|};
export type PostFeedRefetchQuery = {|
  variables: PostFeedRefetchQueryVariables,
  response: PostFeedRefetchQueryResponse,
|};
*/


/*
query PostFeedRefetchQuery(
  $first: Int
  $after: String
  $last: Int
  $before: String
  $orderBy: PostOrdering
) {
  xxx {
    ...PostFeed_xxx_sdb03
  }
}

fragment PostFeed_xxx_sdb03 on XXX {
  posts(first: $first, after: $after, last: $last, before: $before, orderBy: $orderBy) {
    edges {
      node {
        id
        ...PostDetails_post
      }
    }
    pageInfo {
      hasNextPage
      endCursor
      hasPreviousPage
      startCursor
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
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "after",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "last",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "before",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "orderBy",
    "type": "PostOrdering",
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
    "name": "before",
    "variableName": "before"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "last",
    "variableName": "last"
  },
  {
    "kind": "Variable",
    "name": "orderBy",
    "variableName": "orderBy"
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
        "kind": "LinkedField",
        "alias": null,
        "name": "xxx",
        "storageKey": null,
        "args": null,
        "concreteType": "XXX",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "PostFeed_xxx",
            "args": (v1/*: any*/)
          }
        ]
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
        "name": "xxx",
        "storageKey": null,
        "args": null,
        "concreteType": "XXX",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "posts",
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
                      (v2/*: any*/),
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
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "hasPreviousPage",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "startCursor",
                    "args": null,
                    "storageKey": null
                  }
                ]
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
    "text": "query PostFeedRefetchQuery(\n  $first: Int\n  $after: String\n  $last: Int\n  $before: String\n  $orderBy: PostOrdering\n) {\n  xxx {\n    ...PostFeed_xxx_sdb03\n  }\n}\n\nfragment PostFeed_xxx_sdb03 on XXX {\n  posts(first: $first, after: $after, last: $last, before: $before, orderBy: $orderBy) {\n    edges {\n      node {\n        id\n        ...PostDetails_post\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment PostDetails_post on Post {\n  title\n  author {\n    name\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e7c4cf76fb3c27796f70f92c47bbb417';
module.exports = node;
