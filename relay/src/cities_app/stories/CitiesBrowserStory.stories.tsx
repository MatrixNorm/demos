import * as React from "react";
import { graphql, LocalQueryRenderer } from "react-relay";
import { createRelayEnvironment, loadingForeverEnvironment } from "../env";
import CitiesBrowser from "../components/CitiesBrowser";

export default { title: "cities_app-demo1/CitiesBrowser" };

// const makeEnv = () => {
//   return createTestingEnv({
//     Query: {
//       citiesMetadata: () => {
//         return {
//           populationLowerBound: 100000,
//           populationUpperBound: 9999999
//         };
//       },
//       citiesPagination(_: any, args: any) {
//         return {
//           nodes: [
//             {
//               id: "city#1",
//               name: "Madrid",
//               country: "Spain",
//               population: 3600000
//             },
//             {
//               id: "city#2",
//               name: "Rome",
//               country: "Italy",
//               population: 4600000
//             },
//             ,
//             {
//               id: "city#3",
//               name: "Turin",
//               country: "Italy",
//               population: 2300000
//             }
//           ],
//           pageNo: 2,
//           hasNextPage: true,
//           hasPrevPage: true
//         };
//       }
//     },
//     Node: {
//       __resolveType() {
//         return "City";
//       }
//     }
//   });
// };

// export const ok = () => {
//   const environment = makeEnv();
//   const searchParams = {
//     countryNameContains: null,
//     populationGte: null,
//     populationLte: null
//   };
//   return (
//     <CitiesBrowserPanel environment={environment} searchParams={searchParams} />
//   );
// };

export const loading = () => {
  const environment = loadingForeverEnvironment();

  return <CitiesBrowser environment={environment} />;
};

export const full = () => {
  const environment = createRelayEnvironment();

  return (
    <div>
      <CitiesBrowser environment={environment} />
      <br />
      <LocalQueryRenderer
        query={graphql`
          query SearchParametersStoryUiQuery {
            __typename
            uiState {
              id
              citySearchParams {
                countryNameContains
                populationGte
                populationLte
              }
            }
          }
        `}
        environment={environment}
        variables={{}}
        render={({ props }: { props: any }) => {
          return (
            props && (
              <div>
                {props.uiState
                  ? JSON.stringify(props.uiState.citySearchParams)
                  : JSON.stringify({})}
              </div>
            )
          );
        }}
      />
    </div>
  );
};
