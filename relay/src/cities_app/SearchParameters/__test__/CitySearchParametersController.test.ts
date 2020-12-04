/* globals describe test expect beforeEach */
import { cons } from "fp-ts/lib/ReadonlyArray";
import { IEnvironment } from "relay-runtime";
import { createMockEnvironment } from "relay-test-utils";
import * as md from "../model";
import * as cspc from "../CitySearchParametersController";

describe("XXX", () => {
  let __env: IEnvironment;

  beforeEach(() => {
    __env = createMockEnvironment();
  });

  test("initial state", () => {
    let state = cspc.lookupStateFromRelayStore(__env);
    expect(state).toEqual({ value: {}, draft: {}, errors: {} });
  });

  test("2", () => {
    let state: md.CitySearchParamsState = { value: {}, draft: {}, errors: {} };
    let stateFromStore = cspc.lookupStateFromRelayStore(__env);
    console.log(stateFromStore);
    //expect(state).toEqual({ value: {}, draft: {}, errors: {} });
  });
});
