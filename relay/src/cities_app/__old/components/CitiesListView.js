// // @flow

// import React from "react";
// import { createFragmentContainer, QueryRenderer, graphql } from "react-relay";
// import CitiesPagination from "./CitiesPagination";
// import environment from "../env";

// function CitiesListView({ localSettings }) {
//   const {selectedContinent} = localSettings
//   return (
//     <QueryRenderer
//       query={graphql`
//         query CitiesListViewQuery(
//           $continent: Continent!
//           $pageNo: Int!
//         ) {
//           viewer {
//             ...CitiesPagination_cities
//               @arguments(continent: $continent, pageNo: $pageNo)
//           }
//         }
//       `}
//       environment={environment}
//       variables={{ continent: selectedContinent, pageNo: 0 }}
//       render={({ error, props }) => {
//         if (error) throw error;
//         if (!props) return <h3>loading...</h3>;
//         return <CitiesPagination cities={props.viewer} />;
//       }}
//     />
//   );
// }

// export default createFragmentContainer(CitiesListView, {
//   localSettings: graphql`
//     fragment CitiesListView_localSettings on LocalSettings {
//       selectedContinent
//     }
//   `
// });
