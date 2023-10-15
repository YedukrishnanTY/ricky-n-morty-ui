import React from "react";
import "./Image.css";
import rick from "./../../../assets/rick-png.png";

export default function Image() {
  return (
    <div className="div-img">
      <div className="img-div">
        <img src={rick} className="rick-img" alt="rick" />
      </div>
    </div>
  );
}
