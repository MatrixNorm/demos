import * as React from 'react';
import { createFragmentContainer, graphql } from "react-relay";
import { City_city } from "./__generated__/City_city.graphql";

interface Props {
  city: City_city;
}

function City({ city }: Props) {
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
