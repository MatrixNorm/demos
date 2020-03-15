/* globals describe test expect beforeEach */
import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import * as TestRenderer from "react-test-renderer";
import UserSettings from "../UserSettings";

describe("XXX", () => {
  let env: any;
  let container: any;

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
    env.mock.resolveMostRecentOperation(operation => {
      let payload = MockPayloadGenerator.generate(operation, {
        User() {
          return {
            id: "user#1",
            name: "Covid",
            settings: {
              citiesPaginationPageSize: 10,
              foo: "foo_value",
              bar: 15
            }
          };
        }
      });
      return payload;
    });
  });

  test("1", () => {
    const paginationPageSizeInput = container.root.findByProps({
      "test-id": "pagination-page-size-input"
    });
    expect(paginationPageSizeInput.props.value).toEqual(10);
    const fooInput = container.root.findByProps({
      "test-id": "foo-input"
    });
    expect(fooInput.props.value).toEqual("foo_value");
    const barInput = container.root.findByProps({
      "test-id": "bar-input"
    });
    expect(barInput.props.value).toEqual(15);
  });

  test("change paginationPageSizeInput", () => {
    const input = container.root.findByProps({
      "test-id": "pagination-page-size-input"
    });
    const section = container.root.findByProps({
      "test-id": "pagination-page-size-section"
    });
    const submit = container.root.findByProps({
      "test-id": "submit-button"
    });

    expect(input.props.value).toEqual(10);
    expect(section.props.className.includes("editing")).toBe(false);
    expect(submit.props.className.includes("editing")).toBe(false);
    TestRenderer.act(() => {
      input.props.onChange({ target: { value: 5 } });
    });

    expect(input.props.value).toEqual(5);
    expect(section.props.className.includes("editing")).toBe(true);
    expect(submit.props.className.includes("editing")).toBe(true);

    TestRenderer.act(() => {
      input.props.onChange({ target: { value: 10 } });
    });
    expect(input.props.value).toEqual(10);
    expect(section.props.className.includes("editing")).toBe(false);
    expect(submit.props.className.includes("editing")).toBe(false);
  });
});
