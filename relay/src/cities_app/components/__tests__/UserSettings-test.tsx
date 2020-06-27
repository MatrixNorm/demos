/* globals describe test expect beforeEach */
import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import {
  commitLocalUpdate,
  createOperationDescriptor,
  getRequest,
  OperationDescriptor,
  GraphQLTaggedNode,
} from "relay-runtime";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import * as TestRenderer from "react-test-renderer";
import UserSettingsComponent from "../UserSettings";
import * as UserSettingsUpdateController from "../../mutations/UserSettingsUpdateController";
import { UserSettings_settings } from "__relay__/UserSettings_settings.graphql";
import { UserSettings_editDelta } from "__relay__/UserSettings_editDelta.graphql";
import { UserSettingsTestQuery } from "__relay__/UserSettingsTestQuery.graphql";
import { NukeFragRef } from "../../helpers/typeUtils";

type UserSettings = NukeFragRef<UserSettings_settings>;

function lookupFromStore(query: GraphQLTaggedNode, environment: any): any {
  const operation = createOperationDescriptor(getRequest(query), {});
  const response = environment.lookup(operation.fragment);
  return response.data;
}

function lookupUserSettingFromStore(environment: any) {
  const data = lookupFromStore(
    graphql`
      query UserSettingsTestLookupQuery {
        viewer {
          settings {
            ...UserSettings_settings @relay(mask: false)
          }
        }
        uiState {
          userSettingsEditDelta {
            ...UserSettings_editDelta @relay(mask: false)
          }
        }
      }
    `,
    environment
  );
  return {
    settings: data.viewer?.settings,
    editDelta: data.uiState?.userSettingsEditDelta,
  };
}

function render(mocks: any) {
  let env = createMockEnvironment();
  let container = TestRenderer.create(
    <QueryRenderer<UserSettingsTestQuery>
      query={graphql`
        query UserSettingsTestQuery @relay_test_operation {
          viewer {
            id
            settings {
              ...UserSettings_settings
            }
          }
          uiState {
            userSettingsEditDelta {
              ...UserSettings_editDelta
            }
          }
        }
      `}
      environment={env}
      variables={{}}
      render={({ props }) => {
        return (
          props &&
          props.viewer && (
            <UserSettingsComponent
              settings={props.viewer.settings}
              editDelta={props.uiState?.userSettingsEditDelta || null}
            />
          )
        );
      }}
    />
  );
  env.mock.resolveMostRecentOperation((operation: OperationDescriptor) => {
    let payload = MockPayloadGenerator.generate(operation, mocks);
    return payload;
  });
  // XXX why is this?
  TestRenderer.act(() => {});

  return {
    env,
    inp(field: keyof UserSettings) {
      return container.root.findByProps({
        "test-id": `${field}-input`,
      });
    },
    sec(field: keyof UserSettings) {
      return container.root.findByProps({
        "test-id": `${field}-section`,
      });
    },
    subBtn: container.root.findByProps({
      "test-id": "submit-button",
    }),
  };
}

describe("???", () => {
  let __initialSettings: UserSettings = {
    citiesPaginationPageSize: 10,
    foo: "foo_value",
    bar: 15,
  };
  let __a: any;

  function edit(field: keyof UserSettings, value: any) {
    TestRenderer.act(() => {
      __a.inp(field).props.onChange(value);
    });
  }
  function submit() {
    TestRenderer.act(() => {
      __a.subBtn.props.onClick();
    });
  }
  function beEqual(field: keyof UserSettings, value: any) {
    expect(__a.inp(field).props.value).toEqual(value);
  }
  function beEdited(field: keyof UserSettings) {
    expect(__a.sec(field).props.className.includes("editing")).toBe(true);
  }
  function beNotEdited(field: keyof UserSettings) {
    expect(__a.sec(field).props.className.includes("editing")).toBe(false);
  }
  function submitBeOn() {
    expect(__a.subBtn.props.className.includes("disabled")).toBe(false);
  }
  function submitBeOff() {
    expect(__a.subBtn.props.className.includes("disabled")).toBe(true);
  }

  const db = {
    beSettingsEqual(expectedValue: any) {
      expect(lookupUserSettingFromStore(__a.env).settings).toMatchObject(expectedValue);
    },
    beEditDeltaEqual(expectedValue: any) {
      let editDelta = lookupUserSettingFromStore(__a.env).editDelta;
      if (expectedValue) {
        expect(editDelta).toEqual(expectedValue);
      } else {
        expect(editDelta).toEqual(null);
      }
    },
  };

  function beOnlyOneMutatation(mutParams: object) {
    expect(__a.env.mock.getAllOperations().length).toBe(1);
    expect(__a.env.mock.getMostRecentOperation().root.variables).toMatchObject({
      input: mutParams,
    });
  }
  function beNoMutatations() {
    expect(__a.env.mock.getAllOperations().length).toBe(0);
  }

  function resolveMutation(settings: UserSettings) {
    __a.env.mock.resolveMostRecentOperation((operation: OperationDescriptor) => {
      let payload = MockPayloadGenerator.generate(operation, {
        UpdateUserSettingsPayload() {
          return {
            user: {
              id: "user#19",
              settings,
            },
          };
        },
      });
      return payload;
    });
  }

  beforeEach(() => {
    __a = render({
      User() {
        return {
          id: "user#19",
          name: "coronavirus",
          settings: __initialSettings,
        };
      },
      UIState() {
        return { userSettingsEditDelta: null };
      },
    });
  });

  afterEach(() => {
    UserSettingsUpdateController.resetControllerStateAtom();
  });

  test("t0 initial render", () => {
    beEqual("citiesPaginationPageSize", __initialSettings["citiesPaginationPageSize"]);
    beNotEdited("citiesPaginationPageSize");
    beEqual("foo", __initialSettings["foo"]);
    beNotEdited("foo");
    beEqual("bar", __initialSettings["bar"]);
    beNotEdited("bar");
    submitBeOff();
  });

  test("t1: edit", () => {
    edit("citiesPaginationPageSize", 22);
    beEqual("citiesPaginationPageSize", 22);
    beEdited("citiesPaginationPageSize");
    submitBeOn();
  });

  test("t2: edit, submit", () => {
    edit("citiesPaginationPageSize", 22);
    submit();
    beOnlyOneMutatation({ citiesPaginationPageSize: 22, userId: "user#19" });
    db.beEditDeltaEqual(null);
    beEqual("citiesPaginationPageSize", 22);
    beNotEdited("citiesPaginationPageSize");
    submitBeOff();
  });

  test("t3: edit, submit, resolve", () => {
    edit("citiesPaginationPageSize", 22);
    edit("foo", "new foo");
    submit();
    beOnlyOneMutatation({
      citiesPaginationPageSize: 22,
      foo: "new foo",
      userId: "user#19",
    });
    db.beEditDeltaEqual(null);
    resolveMutation({
      ...__initialSettings,
      citiesPaginationPageSize: 22,
      foo: "new foo",
    });
    db.beEditDeltaEqual(null);
    beNoMutatations();
    beEqual("citiesPaginationPageSize", 22);
    beEqual("foo", "new foo");
    beEqual("bar", __initialSettings["bar"]);
    submitBeOff();
  });

  test("t4: edit, submit, edit, resolve", () => {
    edit("citiesPaginationPageSize", 22);
    submit();
    edit("foo", "local foo");
    edit("bar", 314);
    resolveMutation({
      ...__initialSettings,
      citiesPaginationPageSize: 22,
      foo: "new server foo",
    });
    beNoMutatations();
    db.beEditDeltaEqual({ foo: "local foo", bar: 314 });
    beEqual("citiesPaginationPageSize", 22);
    beEqual("foo", "local foo");
    beEqual("bar", 314);
    submitBeOn();
  });

  test("t5 edit, submit, reject with server error", () => {
    edit("citiesPaginationPageSize", 22);
    submit();
    __a.env.mock.resolveMostRecentOperation({
      errors: [{ message: "scheisse" }],
      data: { updateUserSettings: null },
    });
    beNoMutatations();
    db.beEditDeltaEqual({ citiesPaginationPageSize: 22 });
    beEqual("citiesPaginationPageSize", 22);
    beEqual("foo", __initialSettings["foo"]);
    beEqual("bar", __initialSettings["bar"]);
    submitBeOn();
  });

  test("t6 edit, submit, reject with app error", () => {
    edit("citiesPaginationPageSize", 22);
    submit();
    __a.env.mock.rejectMostRecentOperation(new Error("wtf"));
    beNoMutatations();
    db.beEditDeltaEqual({ citiesPaginationPageSize: 22 });
    beEqual("citiesPaginationPageSize", 22);
    beEqual("foo", __initialSettings["foo"]);
    beEqual("bar", __initialSettings["bar"]);
    submitBeOn();
  });

  test("t7 edit, submit, edit, submit, resolve", () => {
    edit("citiesPaginationPageSize", 22);
    console.log(11111);
    submit();
    // mutation started, optUpt applied
    // beOnlyOneMutatation({ citiesPaginationPageSize: 22, userId: "user#19" });
    // db.beSettingsEqual({ ...__initialSettings, citiesPaginationPageSize: 22 });
    // db.beEditDeltaEqual(null);

    edit("bar", 314);
    // beOnlyOneMutatation({ citiesPaginationPageSize: 22, userId: "user#19" });
    // db.beSettingsEqual({ ...__initialSettings, citiesPaginationPageSize: 22 });
    // db.beEditDeltaEqual({ bar: 314 });
    console.log(22222);
    submit();
    // // // queue but not apply second mutation, apply optUpd2
    // // beOnlyOneMutatation({ citiesPaginationPageSize: 22, userId: "user#19" });
    // // db.beSettingsEqual({ citiesPaginationPageSize: 22, bar: 314 });
    // // db.beEditDeltaEqual(null);
    console.log(33333);
    resolveMutation({
      ...__initialSettings,
      citiesPaginationPageSize: 22,
      foo: "new server foo",
    });
    // db.beSettingsEqual({
    //   citiesPaginationPageSize: 22,
    //   foo: "new server foo",
    //   bar: 314,
    // });
    //beOnlyOneMutatation({ foo: "local foo", bar: 314, userId: "user#19" });
    // beEqual("citiesPaginationPageSize", 22);
    // beEqual("foo", "local foo");
    // beEqual("bar", 314);
    // submitBeOff();
  });

  test("t8 edit, submit, edit, submit, reject mutation", () => {
    edit("citiesPaginationPageSize", 22);
    submit();
    // __db.settingsBeEqual({
    //   citiesPaginationPageSize: 22,
    //   foo: __initialSettings["foo"],
    //   bar: __initialSettings["bar"],
    // });
    edit("foo", "local foo");
    edit("citiesPaginationPageSize", 33);
    submit();
    // only first submit hits network
    // expect(__a.env.mock.getAllOperations().length).toBe(1);
    // expect(__a.env.mock.getMostRecentOperation().root.variables).toMatchObject({
    //   input: { citiesPaginationPageSize: 22, userId: "user#19" },
    // });
    // // __db.settingsBeEqual({
    //   citiesPaginationPageSize: 33,
    //   foo: "local foo",
    //   bar: __initialSettings["bar"],
    // });
    // // reject first mutation
    // __a.env.mock.resolveMostRecentOperation({
    //   errors: [{ message: "scheisse" }],
    //   data: { updateUserSettings: null },
    // });
    // new mutation is commited
    // expect(__a.env.mock.getMostRecentOperation().root.node.name).toBe(
    //   "UpdateUserSettingsMutation"
    // );
    // expect(__a.env.mock.getMostRecentOperation().root.variables).toMatchObject({
    //   input: { citiesPaginationPageSize: 33, foo: "local foo", userId: "user#19" },
    // });
    // beEqual("citiesPaginationPageSize", 33);
    // beEqual("foo", "local foo");
    // submitBeOff();
  });
});
