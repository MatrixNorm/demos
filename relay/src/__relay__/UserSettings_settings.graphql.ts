/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserSettings_settings = {
    readonly citiesPaginationPageSize: number | null;
    readonly " $refType": "UserSettings_settings";
};
export type UserSettings_settings$data = UserSettings_settings;
export type UserSettings_settings$key = {
    readonly " $data"?: UserSettings_settings$data;
    readonly " $fragmentRefs": FragmentRefs<"UserSettings_settings">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "UserSettings_settings",
  "type": "UserSettings",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "citiesPaginationPageSize",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '7bc61e2de039c18556651e0d21307aaf';
export default node;
