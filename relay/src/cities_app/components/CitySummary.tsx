import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import styled from "styled-components";
import { NukeFragRef } from "../helpers/typeUtils";
import LoadingContext, { placeholderCssMixin } from "../LoadingContext";
import { CitySummary_city } from "__relay__/CitySummary_city.graphql";

type Args = {
  city: CitySummary_city;
};

type Props = Args & {
  render?: RenderCallbackType;
};

type RenderCallbackType = (args: Args, isLoading: boolean) => JSX.Element;

const CitySummarySuccess = styled.section`
  padding: 0 1em 0 1em;
  .row {
    text-align: right;
  }
  .row-name {
    text-align: left;
    margin: 0.2em 0 0.2em 0;
  }
  .name {
    margin-right: 2px;
    font-weight: bold;
  }
  .country {
    font-size: 0.85em;
    color: #00bcd4;
  }
  .population-label {
    font-size: 0.9em;
    margin-right: 15px;
  }
  .placeholder {
    position: relative;
  }
`;

const CitySummaryLoading = styled(CitySummarySuccess)`
  ${placeholderCssMixin}
`;

const defaultRender: RenderCallbackType = ({ city }, isLoading) => {
  const CitySummary = isLoading ? CitySummaryLoading : CitySummarySuccess;
  return (
    <CitySummary>
      <div className="row">
        <span className="country placeholder">{city.country}</span>
      </div>
      <div className="row row-name">
        <span className="name placeholder">{city.name}</span>
      </div>
      <div className="row placeholder">
        <label className="population-label">pop.</label>
        <span className="population">{city.population}</span>
      </div>
    </CitySummary>
  );
};

export default createFragmentContainer(
  ({ city, render }: Props) => {
    const isLoading = React.useContext(LoadingContext);
    return (render || defaultRender)({ city }, isLoading);
  },
  {
    city: graphql`
      fragment CitySummary_city on City {
        id
        name
        country
        population
      }
    `,
  }
);

export const defaultData = {
  __typename: "City",
  id: "1",
  name: "Oak City",
  country: "Forestland",
  population: 1000000,
} as NukeFragRef<CitySummary_city>;
