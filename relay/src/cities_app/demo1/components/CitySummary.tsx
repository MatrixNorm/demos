import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import styled from "styled-components";
import { CitySummary_city } from "__relay__/CitySummary_city.graphql";

interface Props {
  city: CitySummary_city;
}

const CityStyle = styled.div`
  .country {
    color: red;
  }
`;

export function CitySummary__({ city }: Props) {
  return (
    <CityStyle>
      <div>
        <span className="name">{city.name}</span>
        <span className="country">{city.country}</span>
      </div>
      <div>
        <label className="population-label">pop.</label>
        <span className="population">{city.population}</span>
      </div>
    </CityStyle>
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
