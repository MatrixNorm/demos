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
        <label className="population-label">pop.</label>
        <span className="population">{city.population}</span>
      </div>
    </CityStyle>
  );
}

export function CitiesPage({ cities, pageNo, hasPrev, hasNext, onPrev, onNext }) {
  return (
    <div>
      <ol>
        {cities.map(city => (
          <City city={city} key={city.id} />
        ))}
      </ol>
      <div>
        {hasPrev && <button onClick={onPrev}>PREV</button>}
        <span>{pageNo}</span>
        {hasNext && <button onClick={onNext}>NEXT</button>}
      </div>
    </div>
  );
}