/* globals describe test expect beforeEach */
import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import * as TestRenderer from "react-test-renderer";
import UserSettings from "../UserSettings";

describe("XXX", () => {
  test("1", () => {
    const env = createMockEnvironment();
    const container = TestRenderer.create(
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
});
