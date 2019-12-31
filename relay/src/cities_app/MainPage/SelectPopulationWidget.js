import { createFragmentContainer, graphql } from "react-relay";

function SelectPopulationWidget({ value }) {
  return null;
}

export default createFragmentContainer(SelectPopulationWidget, {
  value: graphql`
    fragment SelectPopulationWidget_value on CitySearchParams {
      populationUpper
      populationLower
    }
  `,
  meta: graphql`
    fragment SelectPopulationWidget_meta on CitySearchParams {
      populationLowerBound
      populationUpperBound
    }
  `
});
