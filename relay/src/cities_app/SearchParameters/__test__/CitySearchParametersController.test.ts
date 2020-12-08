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

  test("write 1", () => {
    let state: md.CitySearchParamsValidState = {
      value: {
        countryNameContains: "a",
        populationLte: 120,
      } as md.CitySearchParams,
      draft: {},
      errors: {},
    };
    cspc.writeStateIntoRelayStore$(state, __env);
    let stateFromStore = cspc.lookupStateFromRelayStore(__env);
    expect(stateFromStore).toEqual(state);
  });

  test("over-write", () => {
    let state1: md.CitySearchParamsState = {
      value: {
        countryNameContains: "a",
        populationLte: 120,
      } as md.CitySearchParams,
      draft: { countryNameContains: "b" },
      errors: { countryNameContains: "bad value" },
    };
    let state2: md.CitySearchParamsState = {
      value: {
        populationLte: 30,
        populationGte: 10,
      } as md.CitySearchParams,
      draft: {},
      errors: {},
    };
    cspc.writeStateIntoRelayStore$(state1, __env);
    cspc.writeStateIntoRelayStore$(state2, __env);
    let stateFromStore = cspc.lookupStateFromRelayStore(__env);
    expect(stateFromStore).toEqual(state2);
  });
});
