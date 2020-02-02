import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import styled from "styled-components";
import { CitySummary_city } from "__relay__/CitySummary_city.graphql";

interface Props {
  city: CitySummary_city;
}

const CitySummary = styled.section`
  display: inline-block;
  padding: 0 1em 0 1em;
  position: relative;
  .row {
    margin: 0 0 10px 0;
  }
  .row-1 {
    padding-top: 1.1em;
  }
  .name {
    margin-right: 2px;
    font-weight: bold;
  }
  .country {
    font-size: 0.85em;
    color: #00bcd4;
    position: absolute;
    top: 0.4em;
    right: 0.4em;
  }
  .population-label {
    font-size: 0.9em;
    margin-right: 5px;
  }
`;

export default createFragmentContainer(
  ({ city }: Props) => {
    return (
      <CitySummary>
        <div className="row row-1">
          <span className="name">{city.name}</span>
          <span className="country">{city.country}</span>
        </div>
        <div className="row">
          <label className="population-label">population</label>
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
    `
  }
);
