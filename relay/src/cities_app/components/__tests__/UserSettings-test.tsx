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

  test("initial render", () => {
    expect(__a.inp("citiesPaginationPageSize").props.value).toEqual(
      __initialSettings["citiesPaginationPageSize"]
    );
    expect(__a.sec("citiesPaginationPageSize").props.className.includes("editing")).toBe(
      false
    );

    expect(__a.inp("foo").props.value).toEqual(__initialSettings["foo"]);
    expect(__a.sec("foo").props.className.includes("editing")).toBe(false);

    expect(__a.inp("bar").props.value).toEqual(__initialSettings["bar"]);
    expect(__a.sec("bar").props.className.includes("editing")).toBe(false);

    expect(__a.subBtn.props.className.includes("editing")).toBe(false);
  });

  test("t1 edit", () => {
    const inp = __a.inp("citiesPaginationPageSize");

    TestRenderer.act(() => {
      inp.props.onChange(22);
    });
    expect(inp.props.value).toEqual(22);
    expect(__a.sec("citiesPaginationPageSize").props.className.includes("editing")).toBe(
      true
    );
    expect(__a.subBtn.props.className.includes("editing")).toBe(true);
  });

  test("t2 edit, start mutation", () => {
    const inp = __a.inp("citiesPaginationPageSize");
    const sec = __a.sec("citiesPaginationPageSize");
    // edit
    TestRenderer.act(() => {
      inp.props.onChange(22);
    });
    // start mutation
    TestRenderer.act(() => {
      __a.subBtn.props.onClick();
    });
    // optimistic update is applied
    const mutation = __a.env.mock.getMostRecentOperation();
    expect(mutation.root.node.name).toBe("UpdateUserSettingsMutation");
    expect(inp.props.value).toEqual(22);
    expect(sec.props.className.includes("editing")).toBe(false);
    expect(__a.subBtn.props.className.includes("editing")).toBe(false);
  });

  test("t3 edit, start mutation, resolve mutation", () => {
    // edit
    TestRenderer.act(() => {
      __a.inp("citiesPaginationPageSize").props.onChange(22);
    });
    // start mutation
    TestRenderer.act(() => {
      __a.subBtn.props.onClick();
    });
    // resolve mutation
    __a.env.mock.resolveMostRecentOperation((operation: OperationDescriptor) => {
      let payload = MockPayloadGenerator.generate(operation, {
        UpdateUserSettingsPayload() {
          return {
            user: {
              id: "user#19",
              settings: {
                ...__initialSettings,
                citiesPaginationPageSize: 22,
                foo: "new server foo",
              },
            },
          };
        },
      });
      return payload;
    });
    expect(__a.inp("citiesPaginationPageSize").props.value).toEqual(22);
    expect(__a.inp("foo").props.value).toEqual("new server foo");
    expect(__a.inp("bar").props.value).toEqual(__initialSettings["bar"]);
    expect(__a.subBtn.props.className.includes("editing")).toBe(false);
  });

  test("t4 edit, start mutation, edit, resolve mutation", () => {
    // edit
    TestRenderer.act(() => {
      __a.inp("citiesPaginationPageSize").props.onChange(22);
    });
    // start mutation
    TestRenderer.act(() => {
      __a.subBtn.props.onClick();
    });
    //edit foo
    TestRenderer.act(() => {
      __a.inp("foo").props.onChange("local foo");
    });
    // edit bar
    TestRenderer.act(() => {
      __a.inp("bar").props.onChange(314);
    });
    // resolve mutation
    __a.env.mock.resolveMostRecentOperation((operation: OperationDescriptor) => {
      let payload = MockPayloadGenerator.generate(operation, {
        UpdateUserSettingsPayload() {
          return {
            user: {
              id: "user#19",
              settings: {
                ...__initialSettings,
                citiesPaginationPageSize: 22,
                foo: "new server foo",
              },
            },
          };
        },
      });
      return payload;
    });
    expect(__a.inp("citiesPaginationPageSize").props.value).toEqual(22);
    expect(__a.inp("foo").props.value).toEqual("local foo");
    expect(__a.inp("bar").props.value).toEqual(314);
    expect(__a.subBtn.props.className.includes("editing")).toBe(true);
  });

  test("t5 edit, start mutation, reject mutation with server error", () => {
    // edit
    TestRenderer.act(() => {
      __a.inp("citiesPaginationPageSize").props.onChange(22);
    });
    // start mutation
    TestRenderer.act(() => {
      __a.subBtn.props.onClick();
    });
    // resolve mutation
    __a.env.mock.resolveMostRecentOperation({
      errors: [{ message: "sheise" }],
      data: { updateUserSettings: null },
    });
    expect(__a.inp("citiesPaginationPageSize").props.value).toEqual(22);
    expect(__a.inp("foo").props.value).toEqual(__initialSettings["foo"]);
    expect(__a.inp("bar").props.value).toEqual(__initialSettings["bar"]);
    expect(__a.subBtn.props.className.includes("editing")).toBe(true);
  });

  test("t6 edit, start mutation, reject mutation with app error", () => {
    // edit
    TestRenderer.act(() => {
      __a.inp("citiesPaginationPageSize").props.onChange(22);
    });
    // start mutation
    TestRenderer.act(() => {
      __a.subBtn.props.onClick();
    });
    // resolve mutation
    __a.env.mock.rejectMostRecentOperation(new Error("wtf"));
    expect(__a.inp("citiesPaginationPageSize").props.value).toEqual(22);
    expect(__a.inp("foo").props.value).toEqual(__initialSettings["foo"]);
    expect(__a.inp("bar").props.value).toEqual(__initialSettings["bar"]);
    expect(__a.subBtn.props.className.includes("editing")).toBe(true);
  });

  test("t7 edit, start mutation, edit, start mutation, resolve mutation", () => {
    // edit
    TestRenderer.act(() => {
      __a.inp("citiesPaginationPageSize").props.onChange(22);
    });
    // start mutation
    TestRenderer.act(() => {
      __a.subBtn.props.onClick();
    });
    //edit foo
    TestRenderer.act(() => {
      __a.inp("foo").props.onChange("local foo");
    });
    // edit bar
    TestRenderer.act(() => {
      __a.inp("bar").props.onChange(314);
    });
    // start second mutation
    TestRenderer.act(() => {
      __a.subBtn.props.onClick();
    });
    // resolve first mutation
    __a.env.mock.resolveMostRecentOperation((operation: OperationDescriptor) => {
      let payload = MockPayloadGenerator.generate(operation, {
        UpdateUserSettingsPayload() {
          return {
            user: {
              id: "user#19",
              settings: {
                ...__initialSettings,
                citiesPaginationPageSize: 22,
                foo: "new server foo",
              },
            },
          };
        },
      });
      return payload;
    });
    expect(__a.inp("citiesPaginationPageSize").props.value).toEqual(22);
    expect(__a.inp("foo").props.value).toEqual("local foo");
    expect(__a.inp("bar").props.value).toEqual(314);
    expect(__a.subBtn.props.className.includes("editing")).toBe(false);
  });
});
