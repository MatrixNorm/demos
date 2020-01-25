import React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import styled from "styled-components";

const CityStyle = styled.div`
  .country {
    color: blue;
  }
`;

export function City_({ city }) {
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

export default createFragmentContainer(City_, {
  city: graphql`
    fragment City_city on City {
      id
      name
      country
      population
    }
  `
});
