import React from "react";
import placeholderimage from "./placeh.png";

const Placeholder = () => {
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

  const handleImageHover = () => {
    document.getElementById("image").style.opacity = "1";
  };

  const handleImageLeave = () => {
    document.getElementById("image").style.opacity = "0.5";
  };

  const handleWelcomeHover = () => {
    document.getElementById("welcomeText").style.opacity = "1";
  };

  const handleWelcomeLeave = () => {
    document.getElementById("welcomeText").style.opacity = "0.5";
  };

  const handleClickHover = () => {
    document.getElementById("clickText").style.opacity = "1";
  };

  const handleClickLeave = () => {
    document.getElementById("clickText").style.opacity = "0.5";
  };

  const handleMadeWithHover = () => {
    document.getElementById("madeWithText").style.opacity = "1";
  };

  const handleMadeWithLeave = () => {
    document.getElementById("madeWithText").style.opacity = "0.5";
  };

  return (
    <div id="placeholder" style={containerStyle}>
      <img
        id="image"
        src={placeholderimage}
        alt="brandlogo"
        style={imageStyle}
        onMouseEnter={handleImageHover}
        onMouseLeave={handleImageLeave}
      />
      <p
        id="welcomeText"
        style={textStyle}
        onMouseEnter={handleWelcomeHover}
        onMouseLeave={handleWelcomeLeave}
      >
        Welcome to Ease Draw
      </p>
      <h1
        id="clickText"
        style={textStyle}
        onMouseEnter={handleClickHover}
        onMouseLeave={handleClickLeave}
      >
        Click Anywhere to start
      </h1>
      <p
        id="madeWithText"
        style={textStyle}
        onMouseEnter={handleMadeWithHover}
        onMouseLeave={handleMadeWithLeave}
      >
        Made with 💓
      </p>
    </div>
  );
};

export default Placeholder;
