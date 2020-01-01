// import { createRefetchContainer, graphql } from "react-relay";
// import React from "react";

// function City({ city }) {
//   return (
//     <div>
//       <h4>{city.name}</h4>
//       <div>{city.country}</div>
//     </div>
//   );
// }

// function CitiesPaginationListingPanel({ relay, cities }) {
//   const hasPrev = cities?.hasPrevPage;
//   const hasNext = cities?.hasNextPage;
//   const pageNo = cities?.pageNo;

//   function prevPage() {
//     hasPrev &&
//       relay.refetch(prevVars => {
//         return { ...prevVars, pageNo: pageNo - 1 };
//       });
//   }

//   function nextPage() {
//     hasNext &&
//       relay.refetch(prevVars => {
//         return { ...prevVars, pageNo: pageNo + 1 };
//       });
//   }

//   return (
//     <div className="cities-pagination-listing-panel">
//       <ol>
//         {cities.nodes.map(city => (
//           <City city={city} key={city.id} />
//         ))}
//       </ol>
//       <div>
//         <button onClick={prevPage}>PREV</button>
//         <span>{pageNo}</span>
//         <button onClick={nextPage}>NEXT</button>
//       </div>
//     </div>
//   );
// }

// export default createRefetchContainer(
//   CitiesPaginationListingPanel,
//   {
//     cities: graphql`
//       fragment CitiesPaginationListingPanel_cities on CitiesPagination
//         @argumentDefinitions(
//           pageNo: { type: "Int!" }
//           pageSize: { type: "Int!" }
//           searchParams: { type: "CitySearchParamsInput" }
//         ) {
//         nodes {
//           id
//           name
//           country
//           population
//           lat
//           lng
//         }
//         pageNo
//         hasNextPage
//         hasPrevPage
//       }
//     `
//   },
//   graphql`
//     query CitiesPaginationRefetchQuery($pageNo: Int!) {
//       ...CitiesPagination_cities @arguments(pageNo: $pageNo)
//     }
//   `
// );
