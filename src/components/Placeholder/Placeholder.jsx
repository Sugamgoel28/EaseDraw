import React, { useState } from "react";
import placeholderimage from "./placeh.png";

const Placeholder = () => {
  const [hoveredElement, setHoveredElement] = useState(null);

  const handleHover = (elementId, opacity) => {
    document.getElementById(elementId).style.opacity = opacity;
  };

  const containerStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    fontSize: "2rem",
    fontFamily: "Brush Script MT, 'Brush Script Std', cursive",
    fontWeight: "bold",
  };

  const imageStyle = {
    width: "80%",
    opacity: 0.5,
    transition: "opacity 0.3s ease-in-out",
  };

  const textStyle = {
    opacity: 0.5,
    transition: "opacity 0.3s ease-in-out",
    marginTop: 10,
    marginBottom: 0,
  };

  return (
    <div id="placeholder" style={containerStyle}>
      <img
        id="image"
        src={placeholderimage}
        alt="brandlogo"
        style={imageStyle}
        onMouseEnter={() => handleHover("image", 1)}
        onMouseLeave={() => handleHover("image", 0.5)}
      />
      <p
        id="welcomeText"
        style={textStyle}
        onMouseEnter={() => handleHover("welcomeText", 1)}
        onMouseLeave={() => handleHover("welcomeText", 0.5)}
      >
        Welcome to Ease Draw
      </p>
      <h1
        id="clickText"
        style={textStyle}
        onMouseEnter={() => handleHover("clickText", 1)}
        onMouseLeave={() => handleHover("clickText", 0.5)}
      >
        Click Anywhere to start
      </h1>
      <p
        id="madeWithText"
        style={textStyle}
        onMouseEnter={() => handleHover("madeWithText", 1)}
        onMouseLeave={() => handleHover("madeWithText", 0.5)}
      >
        Made with 💓
      </p>
    </div>
  );
};

export default Placeholder;
