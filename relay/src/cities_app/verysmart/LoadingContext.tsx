import * as React from "react";
import { createContext } from "react";
import { LocalQueryRenderer, QueryRenderer } from "react-relay";
import {
  createOperationDescriptor,
  Environment,
  IEnvironment,
  getRequest,
  GraphQLTaggedNode,
  Network,
  OperationType,
  RecordSource,
  Store,
} from "relay-runtime";
import { css, keyframes } from "styled-components";
import { ReloadWrapper, ReloadMessage } from "./ReloadContext";

const LoadingContext = createContext<boolean>(false);
export default LoadingContext;

export function LoadingPlaceholderQueryRenderer<T extends OperationType>({
  query,
  environment,
  variables,
  placeholderData,
  render,
}: {
  query: GraphQLTaggedNode;
  environment: IEnvironment;
  variables: T["variables"];
  placeholderData: any;
  render: ({ props }: { props: T["response"] }) => any;
}) {
  return (
    <ReloadWrapper>
      <QueryRenderer<T>
        query={query}
        environment={environment}
        variables={variables}
        render={({ props, error }) => {
          if (!error && !props) {
            return (
              <LoadingPlaceholder
                query={query}
                variables={{}}
                data={placeholderData}
                render={render}
              />
            );
          }
          if (error) {
            return <ReloadMessage message="oops" />;
          }
          return render({ props });
        }}
      />
    </ReloadWrapper>
  );
}

const createDummyEnvironment = () => {
  const network = Network.create(() => {
    return { data: {} };
  });
  const store = new Store(new RecordSource());
  const environment = new Environment({ network, store });
  return environment;
};

export function LoadingPlaceholder<T extends OperationType>({
  query,
  variables,
  data,
  render,
}: {
  query: GraphQLTaggedNode;
  variables: T["variables"];
  data: any;
  render: ({ props }: { props: T["response"] }) => any;
}) {
  const env = createDummyEnvironment();
  const request = getRequest(query);
  const operation = createOperationDescriptor(request, variables);
  env.commitPayload(operation, data);
  return (
    <LoadingContext.Provider value={true}>
      <LocalQueryRenderer<T>
        query={query}
        environment={env}
        variables={variables}
        render={render}
      />
    </LoadingContext.Provider>
  );
}

const animation = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
`;

export const placeholderCssMixin = css`
  .placeholder {
    visibility: hidden;
    position: relative;
  }
  .placeholder::after {
    content: "";
    background: silver;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    visibility: visible;
    animation: ${animation} 2s linear infinite;
  }
`;
