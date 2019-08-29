/**
 * @flow
 * @relayHash ef33638bbc9535525de76081771b2d61
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type PostDetails_post$ref = any;
export type AppQueryVariables = {|
  count?: ?number,
  cursor?: ?string,
|};
export type AppQueryResponse = {|
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
  |}
|};
export type AppQuery = {|
  variables: AppQueryVariables,
  response: AppQueryResponse,
|};
*/


/*
query AppQuery(
  $count: Int
  $cursor: String
) {
  postFeed(first: $count, after: $cursor) {
    edges {
      node {
        ...PostDetails_post
        id
        __typename
      }
      cursor
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
    "name": "count",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "cursor",
    "type": "String",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v3 = {
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
},
v4 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  }
],
v5 = {
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
    "name": "AppQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "postFeed",
        "name": "__PostFeed_postFeed_connection",
        "storageKey": null,
        "args": null,
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
                  (v1/*: any*/),
                  {
                    "kind": "FragmentSpread",
                    "name": "PostDetails_post",
                    "args": null
                  }
                ]
              },
              (v2/*: any*/)
            ]
          },
          (v3/*: any*/)
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
        "alias": null,
        "name": "postFeed",
        "storageKey": null,
        "args": (v4/*: any*/),
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
                      (v5/*: any*/)
                    ]
                  },
                  (v5/*: any*/),
                  (v1/*: any*/)
                ]
              },
              (v2/*: any*/)
            ]
          },
          (v3/*: any*/)
        ]
      },
      {
        "kind": "LinkedHandle",
        "alias": null,
        "name": "postFeed",
        "args": (v4/*: any*/),
        "handle": "connection",
        "key": "PostFeed_postFeed",
        "filters": null
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "AppQuery",
    "id": null,
    "text": "query AppQuery(\n  $count: Int\n  $cursor: String\n) {\n  postFeed(first: $count, after: $cursor) {\n    edges {\n      node {\n        ...PostDetails_post\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment PostDetails_post on Post {\n  title\n  author {\n    name\n    id\n  }\n}\n",
    "metadata": {
      "connection": [
        {
          "count": "count",
          "cursor": "cursor",
          "direction": "forward",
          "path": [
            "postFeed"
          ]
        }
      ]
    }
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '605a2b1c91085deb3fcea571c130b2fe';
module.exports = node;
