/**
 * @flow
 * @relayHash 8c843d638f5f8df077a361d61d0ac6bb
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type PostFeed_search$ref = any;
export type PostOrderingFields = "createdAt" | "viewsCount";
export type PostOrdering = {|
  field: PostOrderingFields,
  desc?: ?boolean,
|};
export type AppQueryVariables = {|
  first?: ?number,
  after?: ?string,
  last?: ?number,
  before?: ?string,
  orderBy?: ?PostOrdering,
|};
export type AppQueryResponse = {|
  +x1: ?{|
    +$fragmentRefs: PostFeed_search$ref
  |},
  +x2: ?{|
    +$fragmentRefs: PostFeed_search$ref
  |},
|};
export type AppQuery = {|
  variables: AppQueryVariables,
  response: AppQueryResponse,
|};
*/


/*
query AppQuery(
  $first: Int
  $after: String
  $last: Int
  $before: String
  $orderBy: PostOrdering
) {
  x1: search {
    ...PostFeed_search_sdb03
  }
  x2: search {
    ...PostFeed_search_sdb03
  }
}

fragment PostFeed_search_sdb03 on PostSearch {
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
v2 = [
  {
    "kind": "FragmentSpread",
    "name": "PostFeed_search",
    "args": (v1/*: any*/)
  }
],
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = [
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
              (v3/*: any*/),
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
                  (v3/*: any*/)
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
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AppQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "x1",
        "name": "search",
        "storageKey": null,
        "args": null,
        "concreteType": "PostSearch",
        "plural": false,
        "selections": (v2/*: any*/)
      },
      {
        "kind": "LinkedField",
        "alias": "x2",
        "name": "search",
        "storageKey": null,
        "args": null,
        "concreteType": "PostSearch",
        "plural": false,
        "selections": (v2/*: any*/)
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AppQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "x1",
        "name": "search",
        "storageKey": null,
        "args": null,
        "concreteType": "PostSearch",
        "plural": false,
        "selections": (v4/*: any*/)
      },
      {
        "kind": "LinkedField",
        "alias": "x2",
        "name": "search",
        "storageKey": null,
        "args": null,
        "concreteType": "PostSearch",
        "plural": false,
        "selections": (v4/*: any*/)
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "AppQuery",
    "id": null,
    "text": "query AppQuery(\n  $first: Int\n  $after: String\n  $last: Int\n  $before: String\n  $orderBy: PostOrdering\n) {\n  x1: search {\n    ...PostFeed_search_sdb03\n  }\n  x2: search {\n    ...PostFeed_search_sdb03\n  }\n}\n\nfragment PostFeed_search_sdb03 on PostSearch {\n  posts(first: $first, after: $after, last: $last, before: $before, orderBy: $orderBy) {\n    edges {\n      node {\n        id\n        ...PostDetails_post\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment PostDetails_post on Post {\n  title\n  author {\n    name\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'fb48c10ca213e78619e925366a9015ed';
module.exports = node;
