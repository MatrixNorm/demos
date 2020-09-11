import * as React from "react";
import { useState, useContext, createContext } from "react";
import styled from "styled-components";
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

export const LoadingContext = createContext<boolean>(false);
export const ReloadContext = createContext(() => {});

const StyledReload = styled.div`
  text-align: center;
  .message {
    margin-bottom: 1em;
  }
`;

export function ReloadMessagePanel({ message }: { message: string }) {
  const dispatchReload = useContext(ReloadContext);
  return (
    <StyledReload>
      <div className="message">{message}</div>
      <button onClick={dispatchReload} className="button">
        Reload
      </button>
    </StyledReload>
  );
}

export function LoadingPlaceholderQueryRenderer<T extends OperationType>({
  query,
  environment,
  variables,
  // XXX could be generated from the query
  placeholderData,
  render,
}: {
  query: GraphQLTaggedNode;
  environment: IEnvironment;
  variables: T["variables"];
  placeholderData: any;
  render: ({ props }: { props: T["response"] }) => any;
}) {
  const [reloadKey, setReloadKey] = useState(0);

  function dispatchReload() {
    setReloadKey((reloadKey) => reloadKey + 1);
  }

  return (
    <QueryRenderer<T>
      // need this to force remount otherwise
      // no new fetch will be done
      key={reloadKey}
      query={query}
      environment={environment}
      variables={variables}
      render={({ props, error }) => {
        // loading state
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
        // error during fetching
        // either network error or server returns `null` as a response
        if (error) {
          return (
            <StyledReload>
              <div className="message">oops, try again</div>
              <button
                onClick={() => setReloadKey((reloadKey) => reloadKey + 1)}
                className="button"
              >
                Reload
              </button>
            </StyledReload>
          );
        }
        // main path
        // props is non-null here
        return (
          <ReloadContext.Provider value={dispatchReload}>
            {render({ props })}
          </ReloadContext.Provider>
        );
      }}
    />
  );
}

const createDummyEnvironment = () => {
  const network = Network.create(() => {
    // can return placeholder data and no need for LocalQueryRenderer
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
  // XXX
  const request = getRequest(query);
  const operation = createOperationDescriptor(request, variables);
  env.commitPayload(operation, data);
  // ~XXX
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
