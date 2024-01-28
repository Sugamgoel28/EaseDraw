import React from "react";
import RectangleOutlinedIcon from "@mui/icons-material/RectangleOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import HorizontalRuleOutlinedIcon from "@mui/icons-material/HorizontalRuleOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import EllipseIcon from "../../ellipse.svg";

const tools = [
  { id: "pencil", icon: <CreateOutlinedIcon fontSize="large" color="primary" /> },
  { id: "line", icon: <HorizontalRuleOutlinedIcon fontSize="large" color="primary" /> },
  { id: "circle", icon: <CircleOutlinedIcon fontSize="large" color="primary" /> },
  { id: "rect", icon: <RectangleOutlinedIcon fontSize="large" color="primary" /> },
  { id: "ellipse", icon: <img width="44px" src={EllipseIcon} alt="Ellipse" /> },
];

const ToolButton = ({ id, tool, setTool, children }) => (
  <label
    htmlFor={id}
    className={`btn btn-light border ${id === "ellipse" ? "p-2" : "p-3"} ${tool === id ? "active" : ""}`}
  >
    {children}
    <input
      type="radio"
      name="tool"
      id={id}
      checked={tool === id}
      value={id}
      onChange={(e) => setTool(e.target.value)}
      style={{ opacity: "0", width: "0px" }}
    />
  </label>
);

const Toolbar = ({ tool, setTool, color, setColor, handleClearCanvas }) => {
  return (
    <div
      className="btn-group btn-group-toggle btn-group-vertical d-flex flex-column justify-content-center align-items-center z-2"
      style={{ height: "fit-content", top: "2rem", left: "0px",width: "4.5rem" }}
      data-toggle="buttons"
    >
      {tools.map(({ id, icon }) => (
        <ToolButton key={id} id={id} tool={tool} setTool={setTool}>
          {icon}
        </ToolButton>
      ))}
      <label htmlFor="color" className="btn btn-light border">
        <ColorLensOutlinedIcon fontSize="large" color="primary" />
        <input
          type="color"
          id="color"
          style={{
            border: "none",
            width: "2rem",
            height: "1.5vh",
            margin: "0px",
            padding: "0px",
            position: "relative",
            left: "0px",
            top: "-5px",
          }}
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </label>
      <button className="btn btn-danger p-3" onClick={handleClearCanvas}>
        <DeleteIcon fontSize="large" />
      </button>
    </div>
  );
};

export default Toolbar;