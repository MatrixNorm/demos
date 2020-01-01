import { createFragmentContainer, graphql } from "react-relay";

function SelectPopulationWidget({ value, meta }) {
  console.log(value, meta);
  return null;
}

export default createFragmentContainer(SelectPopulationWidget, {
  value: graphql`
    fragment SelectPopulationWidget_value on UICitySearchParams {
      populationUpper
      populationLower
    }
  `,
  meta: graphql`
    fragment SelectPopulationWidget_meta on CitiesMetadata {
      populationLowerBound
      populationUpperBound
    }
  `
});
