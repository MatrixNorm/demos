/* tslint:disable */
/* eslint-disable */
/* @relayHash 150a4b5d9fa4e3c0b512f2caf2236353 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserSettingsStoryQueryVariables = {};
export type UserSettingsStoryQueryResponse = {
    readonly viewer: {
        readonly settings: {
            readonly " $fragmentRefs": FragmentRefs<"UserSettings_settings">;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"UserSettings_viewer">;
    } | null;
};
export type UserSettingsStoryQuery = {
    readonly response: UserSettingsStoryQueryResponse;
    readonly variables: UserSettingsStoryQueryVariables;
};



/*
query UserSettingsStoryQuery {
  viewer {
    ...UserSettings_viewer
    settings {
      ...UserSettings_settings
    }
    id
  }
}

fragment UserSettings_settings on UserSettings {
  citiesPaginationPageSize
}

fragment UserSettings_viewer on User {
  id
}
*/

const node: ConcreteRequest = {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "UserSettingsStoryQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "settings",
            "storageKey": null,
            "args": null,
            "concreteType": "UserSettings",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "UserSettings_settings",
                "args": null
              }
            ]
          },
          {
            "kind": "FragmentSpread",
            "name": "UserSettings_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "UserSettingsStoryQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
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
            "kind": "LinkedField",
            "alias": null,
            "name": "settings",
            "storageKey": null,
            "args": null,
            "concreteType": "UserSettings",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "citiesPaginationPageSize",
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
    "name": "UserSettingsStoryQuery",
    "id": null,
    "text": "query UserSettingsStoryQuery {\n  viewer {\n    ...UserSettings_viewer\n    settings {\n      ...UserSettings_settings\n    }\n    id\n  }\n}\n\nfragment UserSettings_settings on UserSettings {\n  citiesPaginationPageSize\n}\n\nfragment UserSettings_viewer on User {\n  id\n}\n",
    "metadata": {}
  }
};
(node as any).hash = '526eb10a5f1716f1fc7522ce1e3f486e';
export default node;
