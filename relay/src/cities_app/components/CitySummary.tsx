import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import styled, { css } from "styled-components";
import LoadingContext from "../LoadingContext";
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

const sharedStyle = css`
  content: "";
  background: silver;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const CitySummaryLoading = styled(CitySummarySuccess)`
  .country::after {
    ${sharedStyle}
  }

  .name::after {
    ${sharedStyle}
  }

  .population::after {
    ${sharedStyle}
  }

  .population-label::after {
    ${sharedStyle}
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
  name: "aaaaaa",
  country: "bbbbbbbb",
  population: 1000000,
};
