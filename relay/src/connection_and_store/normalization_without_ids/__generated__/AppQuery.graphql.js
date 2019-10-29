/**
 * @flow
 * @relayHash b1c692334f9aaf343dacc8abeb4229de
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AppQueryVariables = {|
  userId1: string,
  userId2: string,
|};
export type AppQueryResponse = {|
  +foo: ?{|
    +bar: ?{|
      +x: number,
      +y: number,
    |}
  |},
  +user1: ?{|
    +id: string,
    +name: string,
    +address: {|
      +state: string,
      +city: {|
        +id: string,
        +name: string,
      |},
    |},
  |},
  +user2: ?{|
    +id: string,
    +name: string,
    +address: {|
      +state: string,
      +city: {|
        +id: string,
        +name: string,
      |},
    |},
  |},
|};
export type AppQuery = {|
  variables: AppQueryVariables,
  response: AppQueryResponse,
|};
*/


/*
query AppQuery(
  $userId1: ID!
  $userId2: ID!
) {
  foo {
    bar {
      x
      y
    }
  }
  user1: user(id: $userId1) {
    id
    name
    address {
      state
      city {
        id
        name
      }
      id
    }
  }
  user2: user(id: $userId2) {
    id
    name
    address {
      state
      city {
        id
        name
      }
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "userId1",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "userId2",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "foo",
  "storageKey": null,
  "args": null,
  "concreteType": "Foo",
  "plural": false,
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "bar",
      "storageKey": null,
      "args": null,
      "concreteType": "Bar",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "x",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "y",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "userId1"
  }
],
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "state",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "city",
  "storageKey": null,
  "args": null,
  "concreteType": "City",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v4/*: any*/)
  ]
},
v7 = [
  (v3/*: any*/),
  (v4/*: any*/),
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "address",
    "storageKey": null,
    "args": null,
    "concreteType": "Address",
    "plural": false,
    "selections": [
      (v5/*: any*/),
      (v6/*: any*/)
    ]
  }
],
v8 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "userId2"
  }
],
v9 = [
  (v3/*: any*/),
  (v4/*: any*/),
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "address",
    "storageKey": null,
    "args": null,
    "concreteType": "Address",
    "plural": false,
    "selections": [
      (v5/*: any*/),
      (v6/*: any*/),
      (v3/*: any*/)
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
      (v1/*: any*/),
      {
        "kind": "LinkedField",
        "alias": "user1",
        "name": "user",
        "storageKey": null,
        "args": (v2/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": (v7/*: any*/)
      },
      {
        "kind": "LinkedField",
        "alias": "user2",
        "name": "user",
        "storageKey": null,
        "args": (v8/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": (v7/*: any*/)
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AppQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      (v1/*: any*/),
      {
        "kind": "LinkedField",
        "alias": "user1",
        "name": "user",
        "storageKey": null,
        "args": (v2/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": (v9/*: any*/)
      },
      {
        "kind": "LinkedField",
        "alias": "user2",
        "name": "user",
        "storageKey": null,
        "args": (v8/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": (v9/*: any*/)
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "AppQuery",
    "id": null,
    "text": "query AppQuery(\n  $userId1: ID!\n  $userId2: ID!\n) {\n  foo {\n    bar {\n      x\n      y\n    }\n  }\n  user1: user(id: $userId1) {\n    id\n    name\n    address {\n      state\n      city {\n        id\n        name\n      }\n      id\n    }\n  }\n  user2: user(id: $userId2) {\n    id\n    name\n    address {\n      state\n      city {\n        id\n        name\n      }\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '197b343f5c2d33d62c4c0cb46ee30bf1';
module.exports = node;
