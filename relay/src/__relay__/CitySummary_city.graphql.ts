/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CitySummary_city = {
    readonly id: string;
    readonly name: string;
    readonly country: string;
    readonly population: number;
    readonly " $refType": "CitySummary_city";
};
export type CitySummary_city$data = CitySummary_city;
export type CitySummary_city$key = {
    readonly " $data"?: CitySummary_city$data;
    readonly " $fragmentRefs": FragmentRefs<"CitySummary_city">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "CitySummary_city",
  "type": "City",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
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
      "name": "country",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "population",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '29351542270b0d3087c203ca5b009f50';
export default node;
