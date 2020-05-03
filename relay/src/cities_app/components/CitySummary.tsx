import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import styled from "styled-components";
import LoadingContext, { placeholderCssMixin } from "../LoadingContext";
import { CitySummary_city } from "__relay__/CitySummary_city.graphql";

interface Props {
  city: CitySummary_city;
}

const CitySummarySuccess = styled.section`
  width: 9em;
  height: 5em;
  display: inline-block;
  padding: 0 1em 0 1em;
  .row {
    text-align: right;
  }
  .row-name {
    text-align: left;
    margin: 0.2em 0 0.2em 0;
  }
  .name {
    position: relative;
    margin-right: 2px;
    font-weight: bold;
  }
  .country {
    position: relative;
    font-size: 0.85em;
    color: #00bcd4;
  }
  .population {
    position: relative;
  }
  .population-label {
    position: relative;
    font-size: 0.9em;
    margin-right: 15px;
  }
`;

const CitySummaryLoading = styled(CitySummarySuccess)`
  .country::after {
    ${placeholderCssMixin}
  }

  .name::after {
    ${placeholderCssMixin}
  }

  .population::after {
    ${placeholderCssMixin}
  }

  .population-label::after {
    ${placeholderCssMixin}
  }
`;

export default createFragmentContainer(
  ({ city }: Props) => {
    const isLoading = React.useContext(LoadingContext);
    const CitySummary = isLoading ? CitySummaryLoading : CitySummarySuccess;
    return (
      <CitySummary>
        <div className="row">
          <span className="country">{city.country}</span>
        </div>
        <div className="row row-name">
          <span className="name">{city.name}</span>
        </div>
        <div className="row">
          <label className="population-label">pop.</label>
          <span className="population">{city.population}</span>
        </div>
      </CitySummary>
    );
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
  name: "aaaaaaa",
  country: "bbbbbbbbbbbb",
  population: 1000000,
};
