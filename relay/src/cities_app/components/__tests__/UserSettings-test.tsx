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
import { UserSettingsType } from "../UserSettings";
import { UserSettingsTestQuery } from "__relay__/UserSettingsTestQuery.graphql";

function lookupFromStore(query: GraphQLTaggedNode, environment: any) {
  const operation = createOperationDescriptor(getRequest(query), {});
  const response = environment.lookup(operation.fragment);
  return response.data;
}

function lookupSettingFromStore(environment: any) {
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

describe("???", () => {
  let env: any;
  let container: any;
  let initialSettings: UserSettingsType = {
    citiesPaginationPageSize: 10,
    foo: "foo_value",
    bar: 15,
  };
  let FIELD_NAMES = Object.keys(initialSettings);
  let inputElements: any = {};
  let sectionElements: any = {};
  let submitButton: any;

  beforeEach(() => {
    env = createMockEnvironment();
    container = TestRenderer.create(
      <QueryRenderer<UserSettingsTestQuery>
        query={graphql`
          query UserSettingsTestQuery @relay_test_operation {
            viewer {
              ...UserSettings_user
            }
          }
        `}
        environment={env}
        variables={{}}
        render={({ props }) => {
          return (
            props &&
            props.viewer && <UserSettingsComponent user={props.viewer} />
          );
        }}
      />
    );
    env.mock.resolveMostRecentOperation((operation: OperationDescriptor) => {
      let payload = MockPayloadGenerator.generate(operation, {
        User() {
          return {
            id: "user#1",
            name: "Covid19",
            settings: initialSettings,
          };
        },
      });
      return payload;
    });
    inputElements = Object.fromEntries(
      FIELD_NAMES.map((field) => [
        field,
        container.root.findByProps({
          "test-id": `${field}-input`,
        }),
      ])
    );
    sectionElements = Object.fromEntries(
      FIELD_NAMES.map((field) => [
        field,
        container.root.findByProps({
          "test-id": `${field}-section`,
        }),
      ])
    );
    submitButton = container.root.findByProps({
      "test-id": "submit-button",
    });

    TestRenderer.act(() => {});
  });

  test("initial render", () => {
    for (let field of FIELD_NAMES) {
      expect(inputElements[field].props.value).toEqual(initialSettings[field]);
    }
  });

  test("component reacts to store update", () => {
    /**
     * If component has a local state then it could shadow store updates
     * that are delivered to component via props. E.g. consider implementation
     * by `setState` hook.
     */
    commitLocalUpdate(env, (store) => {
      const settings = store
        .get("client:root")
        ?.getLinkedRecord("viewer")
        ?.getLinkedRecord("settings");

      settings?.setValue(
        initialSettings.citiesPaginationPageSize + 11,
        "citiesPaginationPageSize"
      );
      settings?.setValue(initialSettings.foo + "@@@", "foo");
    });
    TestRenderer.act(() => {});
    expect(inputElements.citiesPaginationPageSize.props.value).toEqual(
      initialSettings.citiesPaginationPageSize + 11
    );
    expect(inputElements.foo.props.value).toEqual(initialSettings.foo + "@@@");
    expect(inputElements.bar.props.value).toEqual(initialSettings.bar);
  });

  function locallyChangeSingleInput(
    name: string,
    initialValue: any,
    changedValue: any
  ) {
    const input = inputElements[name];
    const section = sectionElements[name];

    expect(input.props.value).toEqual(initialValue);
    expect(section.props.className.includes("editing")).toBe(false);
    expect(submitButton.props.className.includes("editing")).toBe(false);

    TestRenderer.act(() => {
      input.props.onChange(changedValue);
    });
    expect(input.props.value).toEqual(changedValue);
    expect(section.props.className.includes("editing")).toBe(true);
    expect(submitButton.props.className.includes("editing")).toBe(true);

    TestRenderer.act(() => {
      input.props.onChange(initialValue);
    });
    expect(input.props.value).toEqual(initialValue);
    expect(section.props.className.includes("editing")).toBe(false);
    expect(submitButton.props.className.includes("editing")).toBe(false);
  }

  test("locally change citiesPaginationPageSize", () => {
    locallyChangeSingleInput(
      "citiesPaginationPageSize",
      initialSettings.citiesPaginationPageSize,
      initialSettings.citiesPaginationPageSize + 1
    );
  });

  test("locally change foo", () => {
    locallyChangeSingleInput(
      "foo",
      initialSettings.foo,
      initialSettings.foo + "XYZ"
    );
  });

  test("locally change bar", () => {
    locallyChangeSingleInput(
      "bar",
      initialSettings.bar,
      initialSettings.bar + 1
    );
  });

  function mutateSingleFieldResolved(name: string, initialSettings: any) {
    const initialValue = initialSettings[name];
    const newValue = initialValue + 1;
    const input = inputElements[name];
    const section = sectionElements[name];

    expect(section.props.className.includes("editing")).toBe(false);
    expect(submitButton.props.className.includes("editing")).toBe(false);
    // change component's local state
    TestRenderer.act(() => {
      input.props.onChange(newValue);
    });
    expect(input.props.value).toEqual(newValue);
    expect(lookupSettingFromStore(env)[name]).toEqual(initialValue);
    expect(section.props.className.includes("editing")).toBe(true);
    expect(submitButton.props.className.includes("editing")).toBe(true);
    // start mutation
    TestRenderer.act(() => {
      submitButton.props.onClick();
    });
    // optimistic update is applied
    expect(input.props.value).toEqual(newValue);
    expect(lookupSettingFromStore(env)[name]).toEqual(newValue);
    expect(section.props.className.includes("editing")).toBe(false);
    expect(submitButton.props.className.includes("editing")).toBe(false);
    // some data about mutation
    const mutation = env.mock.getMostRecentOperation();
    expect(mutation.root.node.name).toBe("UpdateUserSettingsMutation");
    expect(mutation.root.variables).toMatchObject({
      input: {
        userId: "user#1",
        [name]: newValue,
      },
    });
    // server response overrides everything
    env.mock.resolveMostRecentOperation((operation: OperationDescriptor) => {
      let payload = MockPayloadGenerator.generate(operation, {
        UpdateUserSettingsPayload() {
          return {
            user: {
              id: "user#1",
              settings: {
                ...initialSettings,
                [name]: newValue + 1,
              },
            },
          };
        },
      });
      return payload;
    });
    expect(lookupSettingFromStore(env)[name]).toEqual(newValue + 1);
    TestRenderer.act(() => {});
    expect(input.props.value).toEqual(newValue + 1);
    expect(section.props.className.includes("editing")).toBe(false);
    expect(submitButton.props.className.includes("editing")).toBe(false);
  }

  test("mutate ok citiesPaginationPageSize", () => {
    mutateSingleFieldResolved("citiesPaginationPageSize", initialSettings);
  });

  test("mutate ok foo", () => {
    mutateSingleFieldResolved("foo", initialSettings);
  });

  test("mutate ok bar", () => {
    mutateSingleFieldResolved("bar", initialSettings);
  });

  function mutateSingleFieldRejected(name: string, initialSettings: any) {
    const initialValue = initialSettings[name];
    const newValue = initialValue + 1;
    const input = inputElements[name];
    const section = sectionElements[name];

    expect(section.props.className.includes("editing")).toBe(false);
    expect(submitButton.props.className.includes("editing")).toBe(false);
    // change component's local state
    TestRenderer.act(() => {
      input.props.onChange(newValue);
    });
    expect(input.props.value).toEqual(newValue);
    expect(lookupSettingFromStore(env)[name]).toEqual(initialValue);
    expect(section.props.className.includes("editing")).toBe(true);
    expect(submitButton.props.className.includes("editing")).toBe(true);
    // start mutation
    TestRenderer.act(() => {
      submitButton.props.onClick();
    });
    // optimistic update is applied
    expect(input.props.value).toEqual(newValue);
    expect(lookupSettingFromStore(env)[name]).toEqual(newValue);
    expect(section.props.className.includes("editing")).toBe(false);
    expect(submitButton.props.className.includes("editing")).toBe(false);
    // server error
    // XXX ERROR
    env.mock.rejectMostRecentOperation(new Error("boom"));
    expect(lookupSettingFromStore(env)[name]).toEqual(initialValue);
    TestRenderer.act(() => {});
    expect(input.props.value).toEqual(initialValue);
    expect(section.props.className.includes("editing")).toBe(false);
    expect(submitButton.props.className.includes("editing")).toBe(false);
  }

  // test("mutate error citiesPaginationPageSize", () => {
  //   mutateSingleFieldRejected("citiesPaginationPageSize", initialSettings);
  // });

  test("props override local state", () => {
    /**
     * Relay store should have priority over component local state.
     * Say we updated field `foo` and issued mutation. Then server responds with
     * updated user settings. But on server setting `bar` (=A) is different from client (=B).
     * (E.g. we could use different device). Then relay store is updated with bar=A, but
     * component local state could still have bar=B. That's wrong.
     */
    const initValue = initialSettings.citiesPaginationPageSize;
    const newValue = initValue + 1;
    const input = inputElements.citiesPaginationPageSize;

    TestRenderer.act(() => {
      input.props.onChange(newValue);
    });
    TestRenderer.act(() => {
      submitButton.props.onClick();
    });

    expect(inputElements.citiesPaginationPageSize.props.value).toEqual(
      newValue
    );
    // foo and bar ara unchanged
    expect(inputElements.foo.props.value).toEqual(initialSettings.foo);
    expect(inputElements.bar.props.value).toEqual(initialSettings.bar);

    env.mock.resolveMostRecentOperation((operation: OperationDescriptor) => {
      let payload = MockPayloadGenerator.generate(operation, {
        UpdateUserSettingsPayload() {
          return {
            user: {
              id: "user#1",
              settings: {
                ...initialSettings,
                citiesPaginationPageSize: newValue,
                // server has new values from foo and bar
                foo: initialSettings.foo + 22,
                bar: initialSettings.bar + 11,
              },
            },
          };
        },
      });
      return payload;
    });
    TestRenderer.act(() => {});
    // foo and bar are undated with the latest data from the server
    expect(inputElements.foo.props.value).toEqual(initialSettings.foo + 22);
    expect(inputElements.bar.props.value).toEqual(initialSettings.bar + 11);
  });
});
