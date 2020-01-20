import React from "react";
import styled from "styled-components";

const CityStyle = styled.div`
  .country {
    color: blue;
  }
`;

export function City({ city }) {
  return (
    <CityStyle>
      <div>
        <span className="name">{city.name}</span>
        <span className="country">{city.country}</span>
      </div>
      <div>
        <label className="name">pop.</label>
        <span className="name">{city.population}</span>
      </div>
    </CityStyle>
  );
}