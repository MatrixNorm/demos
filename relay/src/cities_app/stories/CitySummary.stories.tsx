import * as React from "react";
import { graphql, QueryRenderer, LocalQueryRenderer } from "react-relay";
import { createOperationDescriptor, getRequest } from "relay-runtime";
import {
  loadingForeverEnvironment,
  returnPayloadEnvironment,
  returnAsyncPayloadEnvironment,
  noNetworkEnvironment,
} from "../env";
import CitySummary, { defaultData } from "../components/CitySummary";
import LoadingContext from "../LoadingContext";
import { CitySummaryStoryQuery } from "__relay__/CitySummaryStoryQuery.graphql";

export default { title: "cities_app-demo1/CitySummary" };

const query = graphql`
  query CitySummaryStoryQuery($cityId: ID!) {
    city: node(id: $cityId) {
      ...CitySummary_city
    }
  }
`;

export const citySummary = () => {
  const environment = returnPayloadEnvironment({
    city: {
      __typename: "City",
      id: "1",
      name: "Madrid",
      country: "Spain",
      population: 3600000,
    },
  });
  return (
    <QueryRenderer<CitySummaryStoryQuery>
      query={query}
      environment={environment}
      variables={{ cityId: "1" }}
      render={({ props }) => {
        return props && props.city && <CitySummary city={props.city} />;
      }}
    />
  );
};

export const citySummaryLoading = () => {
  return (
    <QueryRenderer<CitySummaryStoryQuery>
      query={query}
      environment={loadingForeverEnvironment()}
      variables={{ cityId: "1" }}
      render={({ props }) => {
        if (props === null) {
          const env = noNetworkEnvironment();
          const request = getRequest(query);
          const operation = createOperationDescriptor(request, { cityId: "1" });
          let data = {
            city: defaultData,
          };
          env.commitPayload(operation, data);
          return (
            <LocalQueryRenderer<CitySummaryStoryQuery>
              query={query}
              environment={env}
              variables={{ cityId: "1" }}
              render={({ props }) => {
                return (
                  props &&
                  props.city && (
                    <LoadingContext.Provider value={true}>
                      <CitySummary city={props.city} />
                    </LoadingContext.Provider>
                  )
                );
              }}
            />
          );
        }
        return null;
      }}
    />
  );
};

export const citySummaryFull = () => {
  return (
    <QueryRenderer<CitySummaryStoryQuery>
      query={query}
      environment={returnAsyncPayloadEnvironment(
        {
          city: defaultData,
        },
        1000
      )}
      variables={{ cityId: "1" }}
      render={({ props }) => {
        if (props === null) {
          const env = noNetworkEnvironment();
          const request = getRequest(query);
          const operation = createOperationDescriptor(request, { cityId: "1" });
          let data = {
            city: {
              __typename: "City",
              id: "1",
              name: "aaaaaa",
              country: "bbbbbbbb",
              population: 1000000,
            },
          };
          env.commitPayload(operation, data);
          return (
            <LocalQueryRenderer<CitySummaryStoryQuery>
              query={query}
              environment={env}
              variables={{ cityId: "1" }}
              render={({ props }) => {
                return (
                  props &&
                  props.city && (
                    <LoadingContext.Provider value={true}>
                      <CitySummary city={props.city} />
                    </LoadingContext.Provider>
                  )
                );
              }}
            />
          );
        }
        return props && props.city && <CitySummary city={props.city} />;
      }}
    />
  );
};

// export const citySummarySkeleton = () => {
//   const env = returnPayloadEnvironment(defaultData);
//   const request = getRequest(query);
//   const operation = createOperationDescriptor(request, { cityId: "1" });
//   let data = {
//     city: {
//       __typename: "City",
//       id: "1",
//       name: "aaaaaa",
//       country: "bbbbbbbb",
//       population: 1000000,
//     },
//   };
//   env.commitPayload(operation, data);
//   console.log(env.getStore().getSource());
//   let response = env.lookup(operation.fragment);
//   console.log(response);
//   return (
//     <QueryRenderer<CitySummaryStoryQuery>
//       query={query}
//       environment={loadingForeverEnvironment()}
//       variables={{ cityId: "1" }}
//       render={({ props }) => {
//         console.log(response.data.city);
//         if (props === null) {
//           return <CitySummary city={response.data.city} />;
//         }
//         return null;
//       }}
//     />
//   );
// };

// export const citySummarySkeleton2 = () => {
//   return (
//     <QueryRenderer<CitySummaryStoryQuery>
//       query={query}
//       environment={loadingForeverEnvironment()}
//       variables={{ cityId: "1" }}
//       render={({ props }) => {
//         if (props === null) {
//           console.log(222222222222);
//           return (
//             <QueryRenderer<CitySummaryStoryQuery>
//               query={query}
//               environment={returnPayloadEnvironment({
//                 city: {
//                   __typename: "City",
//                   id: "1",
//                   name: "Madrid",
//                   country: "Spain",
//                   population: 3600000,
//                 },
//               })}
//               variables={{ cityId: "1" }}
//               render={({ props }) => {
//                 //return <div>xxxx</div>;
//                 return props && props.city && <CitySummary city={props.city} />;
//               }}
//             />
//           );
//         }
//         return null;
//       }}
//     />
//   );
// };

// export const citySummarySkeleton3 = () => {
//   const env = returnPayloadEnvironment(defaultData);
//   const request = getRequest(query);
//   const operation = createOperationDescriptor(request, { cityId: "1" });
//   let data = {
//     city: {
//       __typename: "City",
//       id: "1",
//       name: "aaaaaa",
//       country: "bbbbbbbb",
//       population: 1000000,
//     },
//   };
//   env.commitPayload(operation, data);
//   console.log(env.getStore().getSource()._records);
//   let response = env.lookup(operation.fragment);
//   console.log(response);
//   return (
//     <LocalQueryRenderer<CitySummaryStoryQuery>
//       query={query}
//       environment={env}
//       variables={{ cityId: "1" }}
//       render={({ props }) => {
//         return props && props.city && <CitySummary city={props.city} />;
//       }}
//     />
//   );
// };
