import React from "react";

const CarrerComponent = ({title,Interest}) => {
  return (
    <div className="boxes">
      <p>{title}</p>
      <input onChange={(e)=>{Interest(title)}}  type="checkbox"></input>
    </div>
  );
};

export default CarrerComponent;
