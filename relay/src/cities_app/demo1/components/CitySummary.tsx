import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import styled from "styled-components";
import { CitySummary_city } from "__relay__/CitySummary_city.graphql";

interface Props {
  city: CitySummary_city;
}

const City = styled.div`
  .row {
    margin: 0 0 10px 0;
  }
  .name {
    margin-right: 14px;
    font-weight: bold;
  }
  .country {
    color: red;
  }
  .population-label {
    font-size: 0.9em;
    margin-right: 5px;
  }
`;

export function CitySummary__({ city }: Props) {
  return (
    <City>
      <div className="row">
        <span className="name">{city.name}</span>
        <span className="country">{city.country}</span>
      </div>
      <div className="row">
        <label className="population-label">population</label>
        <span className="population">{city.population}</span>
      </div>
    </City>
  );
}

export default createFragmentContainer(CitySummary__, {
  city: graphql`
    fragment CitySummary_city on City {
      id
      name
      country
      population
    }
  `
});
