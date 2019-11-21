// // @flow

// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   createRefetchContainer,
//   graphql,
//   type RelayRefetchProp
// } from "react-relay";

// type Props = {
//   relay: RelayRefetchProp,
//   cities: any
// };

// const CitiesPagination = ({ relay, cities }: Props) => {
//   const nodes = cities?.citiesPagination?.nodes || [];

//   const hasPrev = cities?.citiesPagination?.hasPrevPage;
//   const hasNext = cities?.citiesPagination?.hasNextPage;
//   const pageNo = cities?.citiesPagination?.pageNo;
//   console.log(pageNo);

//   function prevPagePlease() {
//     hasPrev &&
//       relay.refetch(prevVars => {
//         return { ...prevVars, pageNo: pageNo - 1 };
//       });
//   }

//   function nextPagePlease() {
//     hasNext &&
//       relay.refetch(prevVars => {
//         return { ...prevVars, pageNo: pageNo + 1 };
//       });
//   }

//   return (
//     <div>
//       <div>
//         {nodes.map(node => (
//           <div key={node.id}>
//             <h4><Link to={`/city/${node.id}`}>{node.name}</Link></h4>
//             <div>{node.population}</div>
//           </div>
//         ))}
//       </div>
//       <div>
//         <button onClick={prevPagePlease}>PREV</button>
//         <span>{pageNo}</span>
//         <button onClick={nextPagePlease}>NEXT</button>
//       </div>
//     </div>
//   );
// };

// export default createRefetchContainer(
//   CitiesPagination,
//   {
//     cities: graphql`
//       fragment CitiesPagination_cities on Viewer
//         @argumentDefinitions(
//           continent: { type: "Continent!" }
//           pageNo: { type: "Int!" }
//         ) {
//         citiesPagination(continent: $continent, pageNo: $pageNo) {
//           nodes {
//             id
//             name
//             population
//           }
//           hasNextPage
//           hasPrevPage
//           pageNo
//         }
//       }
//     `
//   },
//   graphql`
//     query CitiesPaginationRefetchQuery($continent: Continent!, $pageNo: Int!) {
//       viewer {
//         ...CitiesPagination_cities
//           @arguments(continent: $continent, pageNo: $pageNo)
//       }
//     }
//   `
// );
