// @flow

import React from "react";
import { createFragmentContainer, graphql } from "react-relay";

function City({ city }) {
  const { name, lat, lng } = city;
  return (
    <div>
      <h3>{name}</h3>
      <div>Latitude: {lat}</div>
      <div>Longitude: {lng}</div>
    </div>
  );
}

export default createFragmentContainer(City, {
  city: graphql`
    fragment City_city on City {
      name
      lat
      lng
    }
  `
});
