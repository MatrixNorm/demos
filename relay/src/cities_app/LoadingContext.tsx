import * as React from "react";
import { createContext } from "react";
import { LocalQueryRenderer, QueryRenderer } from "react-relay";
import { createOperationDescriptor, getRequest } from "relay-runtime";
import { css, keyframes } from "styled-components";
import { noNetworkEnvironment } from "./env";

const LoadingContext = createContext<Boolean>(false);

export default LoadingContext;

export function LoadingPlaceholderQueryRenderer({
  query,
  environment,
  variables,
  placeholderData,
  renderHappyPath,
  happyPredicate,
}: any) {
  return (
    <QueryRenderer
      query={query}
      environment={environment}
      variables={variables}
      render={({ props, error }: any) => {
        // if (error) {
        //   setReload(true);
        //   return;
        // }
        if (props === null) {
          return (
            <LoadingPlaceholder
              query={query}
              variables={{}}
              data={placeholderData}
              render={renderHappyPath}
            />
          );
        }
        // if (!happyPredicate(props)) {
        //   setReload(true);
        //   return;
        // }
        return renderHappyPath(props);
      }}
    />
  );
}

export function LoadingPlaceholder({ query, variables, data, render }: any) {
  const env = noNetworkEnvironment();
  const request = getRequest(query);
  const operation = createOperationDescriptor(request, variables);
  env.commitPayload(operation, data);
  return (
    <LoadingContext.Provider value={true}>
      <LocalQueryRenderer<any>
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
