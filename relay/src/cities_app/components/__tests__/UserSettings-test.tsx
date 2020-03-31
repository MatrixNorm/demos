/* globals describe test expect beforeEach */
import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import {
  createOperationDescriptor,
  getRequest,
  OperationDescriptor
} from "relay-runtime";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import * as TestRenderer from "react-test-renderer";
import UserSettings from "../UserSettings";

function lookupSettingFromStore(environment: any) {
  const query = graphql`
    query UserSettingsTestLookupQuery {
      viewer {
        settings {
          citiesPaginationPageSize
          foo
          bar
        }
      }
    }
  `;
  const operation = createOperationDescriptor(getRequest(query), {});
  const response = environment.lookup(operation.fragment);
  return response.data.viewer.settings;
}

describe("???", () => {
  let env: any;
  let container: any;
  let initialSettings = {
    citiesPaginationPageSize: 10,
    foo: "foo_value",
    bar: 15
  };
  let inputElements: any = {};
  let sectionElements: any = {};
  let submitButton: any;

  beforeEach(() => {
    env = createMockEnvironment();
    container = TestRenderer.create(
      <QueryRenderer<any>
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
          return props && props.viewer && <UserSettings user={props.viewer} />;
        }}
      />
    );
    env.mock.resolveMostRecentOperation((operation: OperationDescriptor) => {
      let payload = MockPayloadGenerator.generate(operation, {
        User() {
          return {
            id: "user#1",
            name: "Covid19",
            settings: initialSettings
          };
        }
      });
      return payload;
    });
    inputElements = {
      citiesPaginationPageSize: container.root.findByProps({
        "test-id": "cities-pagination-page-size-input"
      }),
      foo: container.root.findByProps({
        "test-id": "foo-input"
      }),
      bar: container.root.findByProps({
        "test-id": "bar-input"
      })
    };
    sectionElements = {
      citiesPaginationPageSize: container.root.findByProps({
        "test-id": "cities-pagination-page-size-section"
      }),
      foo: container.root.findByProps({
        "test-id": "foo-section"
      }),
      bar: container.root.findByProps({
        "test-id": "bar-section"
      })
    };
    submitButton = container.root.findByProps({
      "test-id": "submit-button"
    });
  });

  test("initial render", () => {
    expect(inputElements.citiesPaginationPageSize.props.value).toEqual(
      initialSettings.citiesPaginationPageSize
    );
    expect(inputElements.foo.props.value).toEqual(initialSettings.foo);
    expect(inputElements.bar.props.value).toEqual(initialSettings.bar);
  });

  function locallyChangeSingleInput(
    name: string,
    initialValue: any,
    changedValue: any
  ) {
    const input = container.root.findByProps({
      "test-id": `${name}-input`
    });
    const section = container.root.findByProps({
      "test-id": `${name}-section`
    });
    const submit = container.root.findByProps({
      "test-id": "submit-button"
    });

    expect(input.props.value).toEqual(initialValue);
    expect(section.props.className.includes("editing")).toBe(false);
    expect(submit.props.className.includes("editing")).toBe(false);
    TestRenderer.act(() => {
      input.props.onChange({ target: { value: changedValue } });
    });

    expect(input.props.value).toEqual(changedValue);
    expect(section.props.className.includes("editing")).toBe(true);
    expect(submit.props.className.includes("editing")).toBe(true);

    TestRenderer.act(() => {
      input.props.onChange({ target: { value: initialValue } });
    });
    expect(input.props.value).toEqual(initialValue);
    expect(section.props.className.includes("editing")).toBe(false);
    expect(submit.props.className.includes("editing")).toBe(false);
  }

  test("locally change paginationPageSize", () => {
    locallyChangeSingleInput(
      "cities-pagination-page-size",
      initialSettings.citiesPaginationPageSize,
      initialSettings.citiesPaginationPageSize + 1
    );
  });

  test("locally change foo", () => {
    locallyChangeSingleInput(
      "foo",
      initialSettings.foo,
      initialSettings.foo + 1
    );
  });

  test("locally change bar", () => {
    locallyChangeSingleInput(
      "bar",
      initialSettings.bar,
      initialSettings.bar + 1
    );
  });

  test("mutate citiesPaginationPageSize", () => {
    const initValue = initialSettings.citiesPaginationPageSize;
    const newValue = initValue + 1;
    const input = inputElements.citiesPaginationPageSize;
    const section = sectionElements.citiesPaginationPageSize;

    expect(section.props.className.includes("editing")).toBe(false);
    expect(submitButton.props.className.includes("editing")).toBe(false);

    TestRenderer.act(() => {
      input.props.onChange({ target: { value: newValue } });
    });

    expect(input.props.value).toEqual(newValue);
    expect(lookupSettingFromStore(env).citiesPaginationPageSize).toEqual(
      initValue
    );
    expect(section.props.className.includes("editing")).toBe(true);
    expect(submitButton.props.className.includes("editing")).toBe(true);
    
    TestRenderer.act(() => {
      submitButton.props.onClick();
    });

    expect(input.props.value).toEqual(newValue);
    expect(lookupSettingFromStore(env).citiesPaginationPageSize).toEqual(
      newValue
    );
    expect(section.props.className.includes("editing")).toBe(false);
    expect(submitButton.props.className.includes("editing")).toBe(false);
    
    const mutation = env.mock.getMostRecentOperation();
    expect(mutation.root.node.name).toBe("UpdateUserSettingsMutation");
    expect(mutation.root.variables).toMatchObject({
      input: {
        userId: "user#1",
        citiesPaginationPageSize: newValue
      }
    });

    env.mock.resolveMostRecentOperation((operation: OperationDescriptor) => {
      let payload = MockPayloadGenerator.generate(operation, {
        UpdateUserSettingsPayload() {
          return {
            user: {
              id: "user#1",
              settings: {
                ...initialSettings,
                citiesPaginationPageSize: newValue + 1
              }
            }
          };
        }
      });
      return payload;
    });
    expect(lookupSettingFromStore(env).citiesPaginationPageSize).toEqual(
      newValue + 1
    );
    expect(input.props.value).toEqual(newValue + 1);
    // expect(section.props.className.includes("editing")).toBe(false);
    // expect(submitButton.props.className.includes("editing")).toBe(false);
  });
});
