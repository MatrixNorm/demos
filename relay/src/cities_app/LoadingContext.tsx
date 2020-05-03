import * as React from "react";
import { createContext } from "react";
import { LocalQueryRenderer } from "react-relay";
import { createOperationDescriptor, getRequest } from "relay-runtime";
import { css } from "styled-components";
import { noNetworkEnvironment } from "./env";

const LoadingContext = createContext<Boolean>(false);

export default LoadingContext;

export function renderLoadingPlaceholder({
  query,
  variables,
  data,
  render,
}: any) {
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

export const placeholderCssMixin = css`
  content: "";
  background: silver;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;
