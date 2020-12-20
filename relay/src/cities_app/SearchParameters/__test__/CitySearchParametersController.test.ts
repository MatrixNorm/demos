/* globals describe test expect beforeEach */
import { IEnvironment } from "relay-runtime";
import { createMockEnvironment } from "relay-test-utils";
import * as md from "../model";
import * as ctrl from "../CitySearchParametersController";
import { state } from "fp-ts/lib/State";

describe("state write-read", () => {
  let __env: IEnvironment;

  beforeEach(() => {
    __env = createMockEnvironment();
  });

  test("initial state t1", () => {
    let state = ctrl.coeffectLookupState(__env);
    expect(state).toEqual({ value: {}, draft: {} });
  });

  test("write valid t2", () => {
    const value = {
      countryNameContains: "ita",
      populationLte: 120,
    };
    const draft = { countryNameContains: null, populationGte: 10 };
    ctrl.effectWriteState({
      value,
      draft,
      environment: __env,
    });
    let stateFromStore = ctrl.coeffectLookupState(__env);
    expect(stateFromStore).toEqual({ value, draft });
  });

  test("over-write t3", () => {
    let state1 = {
      value: {
        countryNameContains: "ita",
        populationLte: 120,
      },
      draft: { countryNameContains: "bra" },
    };
    ctrl.effectWriteState({ ...state1, environment: __env });
    let state2 = {
      value: {
        populationLte: 30,
        populationGte: 10,
      },
      draft: {},
    };
    ctrl.effectWriteState({ ...state2, environment: __env });
    let stateFromStore = ctrl.coeffectLookupState(__env);
    expect(stateFromStore).toEqual(state2);
  });
});
