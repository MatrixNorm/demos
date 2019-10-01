import React from "react";
import City from "./City";

const CityList = ({ edges }) => {
  return (
    <div>
      {edges.map(edge => (
        <City key={edge.cursor} city={edge.node} />
      ))}
    </div>
  );
};

export default CityList;
