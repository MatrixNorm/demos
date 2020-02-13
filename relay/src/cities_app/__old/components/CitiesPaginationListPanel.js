// import { QueryRenderer, graphql } from "react-relay";
// import React from "react";
// import environment from "theapp/env";
// import CitiesPagination from "theapp/components/CitiesPagination";

// function CitiesPaginationListPanel() {
//   return (
//     <QueryRenderer
//       query={graphql`
//         query CitiesPaginationListPanelQuery($pageNo: Int!) {
//           ...CitiesPagination_cities @arguments(pageNo: $pageNo)
//         }
//       `}
//       environment={environment}
//       variables={{ pageNo: 0 }}
//       render={({ error, props }) => {
//         if (error) throw error;
//         if (!props) return <h3>loading...</h3>;
//         return <CitiesPagination cities={props} />
//       }}
//     />
//   );
// }

// export default CitiesPaginationListPanel;
