/**
 * @flow
 * @relayHash 8556b5b982008cf8529b2e976187d121
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
export type AppQueryVariables = {|
  first?: ?number,
  after?: ?string,
  last?: ?number,
  before?: ?string,
  orderBy?: ?PostOrdering,
|};
export type AppQueryResponse = {|
  +x1: ?{|
    +$fragmentRefs: PostFeed_xxx$ref
  |},
  +x2: ?{|
    +$fragmentRefs: PostFeed_xxx$ref
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
  x1: xxx {
    ...PostFeed_xxx_sdb03
  }
  x2: xxx {
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
v2 = [
  {
    "kind": "FragmentSpread",
    "name": "PostFeed_xxx",
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
        "name": "xxx",
        "storageKey": null,
        "args": null,
        "concreteType": "XXX",
        "plural": false,
        "selections": (v2/*: any*/)
      },
      {
        "kind": "LinkedField",
        "alias": "x2",
        "name": "xxx",
        "storageKey": null,
        "args": null,
        "concreteType": "XXX",
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
        "name": "xxx",
        "storageKey": null,
        "args": null,
        "concreteType": "XXX",
        "plural": false,
        "selections": (v4/*: any*/)
      },
      {
        "kind": "LinkedField",
        "alias": "x2",
        "name": "xxx",
        "storageKey": null,
        "args": null,
        "concreteType": "XXX",
        "plural": false,
        "selections": (v4/*: any*/)
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "AppQuery",
    "id": null,
    "text": "query AppQuery(\n  $first: Int\n  $after: String\n  $last: Int\n  $before: String\n  $orderBy: PostOrdering\n) {\n  x1: xxx {\n    ...PostFeed_xxx_sdb03\n  }\n  x2: xxx {\n    ...PostFeed_xxx_sdb03\n  }\n}\n\nfragment PostFeed_xxx_sdb03 on XXX {\n  posts(first: $first, after: $after, last: $last, before: $before, orderBy: $orderBy) {\n    edges {\n      node {\n        id\n        ...PostDetails_post\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment PostDetails_post on Post {\n  title\n  author {\n    name\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0fa923108b5bd84994a60eb66fb30705';
module.exports = node;
