/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SearchParameters_metadata = {
    readonly populationLowerBound: number;
    readonly populationUpperBound: number;
    readonly " $refType": "SearchParameters_metadata";
};
export type SearchParameters_metadata$data = SearchParameters_metadata;
export type SearchParameters_metadata$key = {
    readonly " $data"?: SearchParameters_metadata$data;
    readonly " $fragmentRefs": FragmentRefs<"SearchParameters_metadata">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "SearchParameters_metadata",
  "type": "CitiesMetadata",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "populationLowerBound",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "populationUpperBound",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = 'a0b54aba36d1143129d0738601707c39';
export default node;
