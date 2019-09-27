/**
 * @flow
 * @relayHash 89b5ab285993c0ba6c97fab9a9976e60
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type PostFeed_search$ref = any;
export type PostOrderingFields = "createdAt" | "viewsCount";
export type PostOrderingInput = {|
  field: PostOrderingFields,
  desc?: ?boolean,
|};
export type AppQueryVariables = {|
  first?: ?number,
  after?: ?string,
  last?: ?number,
  before?: ?string,
  orderBy1?: ?PostOrderingInput,
  orderBy2?: ?PostOrderingInput,
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
  $orderBy1: PostOrderingInput
  $orderBy2: PostOrderingInput
) {
  x1: search {
    ...PostFeed_search_1OAY3Y
  }
  x2: search {
    ...PostFeed_search_2s0h7U
  }
}

fragment PostFeed_search_1OAY3Y on PostSearch {
  posts(first: $first, after: $after, last: $last, before: $before, orderBy: $orderBy1) {
    edges {
      node {
        id
        ...PostDetails_post
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
      hasPreviousPage
      startCursor
    }
    orderBy {
      field
      desc
    }
  }
}

fragment PostFeed_search_2s0h7U on PostSearch {
  posts(first: $first, after: $after, last: $last, before: $before, orderBy: $orderBy2) {
    edges {
      node {
        id
        ...PostDetails_post
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
      hasPreviousPage
      startCursor
    }
    orderBy {
      field
      desc
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
    "name": "orderBy1",
    "type": "PostOrderingInput",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "orderBy2",
    "type": "PostOrderingInput",
    "defaultValue": null
  }
],
v1 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v2 = {
  "kind": "Variable",
  "name": "before",
  "variableName": "before"
},
v3 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v4 = {
  "kind": "Variable",
  "name": "last",
  "variableName": "last"
},
v5 = [
  (v1/*: any*/),
  (v2/*: any*/),
  (v3/*: any*/),
  (v4/*: any*/),
  {
    "kind": "Variable",
    "name": "orderBy",
    "variableName": "orderBy1"
  }
],
v6 = [
  (v1/*: any*/),
  (v2/*: any*/),
  (v3/*: any*/),
  (v4/*: any*/),
  {
    "kind": "Variable",
    "name": "orderBy",
    "variableName": "orderBy2"
  }
],
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v8 = [
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
          (v7/*: any*/),
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
              (v7/*: any*/)
            ]
          }
        ]
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "cursor",
        "args": null,
        "storageKey": null
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
  },
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "orderBy",
    "storageKey": null,
    "args": null,
    "concreteType": "PostOrdering",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "field",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "desc",
        "args": null,
        "storageKey": null
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
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "PostFeed_search",
            "args": (v5/*: any*/)
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": "x2",
        "name": "search",
        "storageKey": null,
        "args": null,
        "concreteType": "PostSearch",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "PostFeed_search",
            "args": (v6/*: any*/)
          }
        ]
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
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "posts",
            "storageKey": null,
            "args": (v5/*: any*/),
            "concreteType": "PostConnection",
            "plural": false,
            "selections": (v8/*: any*/)
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": "x2",
        "name": "search",
        "storageKey": null,
        "args": null,
        "concreteType": "PostSearch",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "posts",
            "storageKey": null,
            "args": (v6/*: any*/),
            "concreteType": "PostConnection",
            "plural": false,
            "selections": (v8/*: any*/)
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "AppQuery",
    "id": null,
    "text": "query AppQuery(\n  $first: Int\n  $after: String\n  $last: Int\n  $before: String\n  $orderBy1: PostOrderingInput\n  $orderBy2: PostOrderingInput\n) {\n  x1: search {\n    ...PostFeed_search_1OAY3Y\n  }\n  x2: search {\n    ...PostFeed_search_2s0h7U\n  }\n}\n\nfragment PostFeed_search_1OAY3Y on PostSearch {\n  posts(first: $first, after: $after, last: $last, before: $before, orderBy: $orderBy1) {\n    edges {\n      node {\n        id\n        ...PostDetails_post\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n      hasPreviousPage\n      startCursor\n    }\n    orderBy {\n      field\n      desc\n    }\n  }\n}\n\nfragment PostFeed_search_2s0h7U on PostSearch {\n  posts(first: $first, after: $after, last: $last, before: $before, orderBy: $orderBy2) {\n    edges {\n      node {\n        id\n        ...PostDetails_post\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n      hasPreviousPage\n      startCursor\n    }\n    orderBy {\n      field\n      desc\n    }\n  }\n}\n\nfragment PostDetails_post on Post {\n  title\n  author {\n    name\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '43fd0e3d2efacdc02b05da638afccd82';
module.exports = node;
