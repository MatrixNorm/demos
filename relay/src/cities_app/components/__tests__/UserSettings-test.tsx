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
            citiesPaginationPageSize
            foo
            bar
          }
        }
      }
    `,
    environment
  );
  return data.viewer.settings;
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
    UserSettingsUpdateController.resetFsmStateAtom();
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

  test("t1 edit", () => {
    edit("citiesPaginationPageSize", 22);
    beEqual("citiesPaginationPageSize", 22);
    beEdited("citiesPaginationPageSize");
    submitBeOn();
  });

  test("t2 edit, start mutation", () => {
    edit("citiesPaginationPageSize", 22);
    submit();
    // optimistic update is applied
    const mutation = __a.env.mock.getMostRecentOperation();
    expect(mutation.root.node.name).toBe("UpdateUserSettingsMutation");
    beEqual("citiesPaginationPageSize", 22);
    beNotEdited("citiesPaginationPageSize");
    submitBeOff();
  });

  test("t3 edit, start mutation, resolve mutation", () => {
    edit("citiesPaginationPageSize", 22);
    submit();
    resolveMutation({
      ...__initialSettings,
      citiesPaginationPageSize: 22,
      foo: "new server foo",
    });
    beEqual("citiesPaginationPageSize", 22);
    beEqual("foo", "new server foo");
    beEqual("bar", __initialSettings["bar"]);
    submitBeOff();
  });

  test("t4 edit, start mutation, edit, resolve mutation", () => {
    edit("citiesPaginationPageSize", 22);
    submit();
    edit("foo", "local foo");
    edit("bar", 314);
    resolveMutation({
      ...__initialSettings,
      citiesPaginationPageSize: 22,
      foo: "new server foo",
    });
    beEqual("citiesPaginationPageSize", 22);
    beEqual("foo", "local foo");
    beEqual("bar", 314);
    submitBeOn();
  });

  test("t5 edit, start mutation, reject mutation with server error", () => {
    edit("citiesPaginationPageSize", 22);
    submit();
    // resolve mutation
    __a.env.mock.resolveMostRecentOperation({
      errors: [{ message: "sheise" }],
      data: { updateUserSettings: null },
    });
    beEqual("citiesPaginationPageSize", 22);
    beEqual("foo", __initialSettings["foo"]);
    beEqual("bar", __initialSettings["bar"]);
    submitBeOn();
  });

  test("t6 edit, start mutation, reject mutation with app error", () => {
    edit("citiesPaginationPageSize", 22);
    submit();
    // resolve mutation
    __a.env.mock.rejectMostRecentOperation(new Error("wtf"));
    beEqual("citiesPaginationPageSize", 22);
    beEqual("foo", __initialSettings["foo"]);
    beEqual("bar", __initialSettings["bar"]);
    submitBeOn();
  });

  test("t7 edit, start mutation, edit, start mutation, resolve mutation", () => {
    edit("citiesPaginationPageSize", 22);
    submit();
    edit("foo", "local foo");
    edit("bar", 314);
    submit();
    resolveMutation({
      ...__initialSettings,
      citiesPaginationPageSize: 22,
      foo: "new server foo",
    });
    beEqual("citiesPaginationPageSize", 22);
    beEqual("foo", "local foo");
    beEqual("bar", 314);
    submitBeOff();
  });
});
