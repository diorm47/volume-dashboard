import React, { useState } from "react";
import "./switch.css";

function Switch({open}) {
  const [isSwitchedOn, setIsSwitchedOn] = useState(open);

  const handleButtonClick = () => {
    setIsSwitchedOn((prevState) => !prevState);
  };

  return (
    <div
      className={`switch-btn ${isSwitchedOn ? "switch-on" : ""}`}
      onClick={handleButtonClick}
    ></div>
  );
}

export default Switch;
