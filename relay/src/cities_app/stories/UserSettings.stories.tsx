import * as React from "react";
import { useState, useEffect } from "react";
import { QueryRenderer, graphql } from "react-relay";
import { createAsyncTestingEnv, XXX, Server } from "../env";
import UserSettings from "../components/UserSettings";
import { UserSettingsStoryQuery } from "__relay__/UserSettingsStoryQuery.graphql";

export default { title: "cities_app-demo1/UserSettings" };

const query = graphql`
  query UserSettingsStoryQuery {
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
      userSettingsOptimisticDelta {
        ...UserSettings_optimisticDelta
      }
    }
  }
`;

export const demo1 = () => {
  console.log("!!!!!!!!!!!!!!!!!!");
  let user = {
    id: "user#777",
    __type: "User",
    name: "Nik",
    settings: {
      citiesPaginationPageSize: 10,
      foo: "foo value",
      bar: 99,
    },
  };
  const environment = createAsyncTestingEnv(100, {
    Query: {
      viewer() {
        return user;
      },
    },
    Mutation: {
      updateUserSettings(_: any, { input }: any) {
        for (let field of ["citiesPaginationPageSize", "foo", "bar"]) {
          if (input[field]) {
            // @ts-ignore
            user.settings[field] = input[field];
          }
        }
        return { user };
      },
    },
  });
  //@ts-ignore
  window.relayStore = environment.getStore().getSource()._records;
  return (
    <QueryRenderer<UserSettingsStoryQuery>
      query={query}
      environment={environment}
      variables={{}}
      render={({ props }) => {
        return (
          props &&
          props.viewer && (
            <UserSettings
              settings={props.viewer.settings}
              editDelta={props.uiState?.userSettingsEditDelta || null}
              optimisticDelta={props.uiState?.userSettingsOptimisticDelta || null}
            />
          )
        );
      }}
    />
  );
};

export const demo2 = () => {
  console.log("!!!!!!!!!!!!!!!!!!");
  let user = {
    id: "user#777",
    __type: "User",
    name: "Nik",
    settings: {
      citiesPaginationPageSize: 10,
      foo: "foo value",
      bar: 99,
    },
  };
  const server = new Server({
    Query: {
      viewer() {
        return user;
      },
    },
    Mutation: {
      updateUserSettings(_: any, { input }: any) {
        for (let field of ["citiesPaginationPageSize", "foo", "bar"]) {
          if (input[field]) {
            // @ts-ignore
            user.settings[field] = input[field];
          }
        }
        return { user };
      },
    },
  });
  const environment = XXX(server);
  //@ts-ignore
  window.relayStore = environment.getStore().getSource()._records;
  return (
    <>
      <QueryRenderer<UserSettingsStoryQuery>
        query={query}
        environment={environment}
        variables={{}}
        render={({ props }) => {
          return (
            props &&
            props.viewer && (
              <UserSettings
                settings={props.viewer.settings}
                editDelta={props.uiState?.userSettingsEditDelta || null}
                optimisticDelta={props.uiState?.userSettingsOptimisticDelta || null}
              />
            )
          );
        }}
      />
      <Abc server={server} />
    </>
  );
};

function Abc({ server }: any) {
  const [requests, setRequests] = useState(server.getRequests());
  useEffect(() => {
    server.subscribe((requests) => {
      console.log(333, { requests });
      setRequests([...requests]);
    });
  }, []);
  console.log(7777, { requests });
  return (
    <div>
      {requests.map((r) => (
        <div>
          <div>{r.data.operation.name}</div>
          <div>{JSON.stringify(r.data.variables)}</div>
          <div>
            <button onClick={r.resolveRequest}>resolve</button>
            <button onClick={r.rejectRequest}>reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}
