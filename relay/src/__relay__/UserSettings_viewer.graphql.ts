/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserSettings_viewer = {
    readonly id: string;
    readonly " $refType": "UserSettings_viewer";
};
export type UserSettings_viewer$data = UserSettings_viewer;
export type UserSettings_viewer$key = {
    readonly " $data"?: UserSettings_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"UserSettings_viewer">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "UserSettings_viewer",
  "type": "User",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '310374d1f0da700f3305bc1c680e8d9e';
export default node;
