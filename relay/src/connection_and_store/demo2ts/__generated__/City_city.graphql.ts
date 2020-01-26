/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type City_city = {
    readonly name: string;
    readonly lat: number;
    readonly lng: number;
    readonly " $refType": "City_city";
};
export type City_city$data = City_city;
export type City_city$key = {
    readonly " $data"?: City_city$data;
    readonly " $fragmentRefs": FragmentRefs<"City_city">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "City_city",
  "type": "City",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "lat",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "lng",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '6c11fc3413543e04c9047155576d140f';
export default node;
