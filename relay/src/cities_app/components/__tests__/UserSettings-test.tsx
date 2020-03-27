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
  const initialSettings = {
    citiesPaginationPageSize: 10,
    foo: "foo_value",
    bar: 15
  };

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
  });

  // test("initial render", () => {
  //   const paginationPageSizeInput = container.root.findByProps({
  //     "test-id": "pagination-page-size-input"
  //   });
  //   expect(paginationPageSizeInput.props.value).toEqual(10);
  //   const fooInput = container.root.findByProps({
  //     "test-id": "foo-input"
  //   });
  //   expect(fooInput.props.value).toEqual("foo_value");
  //   const barInput = container.root.findByProps({
  //     "test-id": "bar-input"
  //   });
  //   expect(barInput.props.value).toEqual(15);
  // });

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

  test("locally change paginationPageSizeInput", () => {
    locallyChangeSingleInput("pagination-page-size", 10, 5);
  });

  test("locally change fooInput", () => {
    locallyChangeSingleInput("foo", "foo_value", "foo_value_new");
  });

  test("locally change barInput", () => {
    locallyChangeSingleInput("bar", 15, 23);
  });

  test("mut1", () => {
    const initValue = initialSettings.citiesPaginationPageSize;
    const newValue = initValue + 3;
    const input = container.root.findByProps({
      "test-id": "pagination-page-size-input"
    });
    const submitButton = container.root.findByProps({
      "test-id": "submit-button"
    });
    TestRenderer.act(() => {
      input.props.onChange({ target: { value: newValue } });
    });
    expect(lookupSettingFromStore(env).citiesPaginationPageSize).toEqual(
      initValue
    );
    TestRenderer.act(() => {
      submitButton.props.onClick();
    });
    //console.log(env.mock.getAllOperations());
    expect(lookupSettingFromStore(env).citiesPaginationPageSize).toEqual(
      newValue
    );
  });
});
