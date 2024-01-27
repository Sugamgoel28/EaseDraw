import RectangleOutlinedIcon from "@mui/icons-material/RectangleOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import HorizontalRuleOutlinedIcon from "@mui/icons-material/HorizontalRuleOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { useEffect } from "react";

const Toolbar = ({
  tool,
  setTool,
  color,
  setColor,
  handleClearCanvas,
}) => {
  return (
    <div
      className="btn-group btn-group-toggle btn-group-vertical d-flex flex-column justify-content-center align-items-center z-2"
      style={{ height: "5vh", top: "38vh", left: "0px", width: "70px" }}
      data-toggle="buttons"
    >
      <label
        htmlFor="pencil"
        className={`btn btn-light border p-3 ${
          tool === "pencil" ? "active" : ""
        }`}
      >
        <CreateOutlinedIcon fontSize="large" color="primary" />
        <input
          type="radio"
          name="tool"
          id="pencil"
          checked={tool === "pencil"}
          value="pencil"
          onChange={(e) => setTool(e.target.value)}
          style={{ opacity: "0", width: "0px" }}
        />
      </label>
      <label htmlFor="line" className={`btn btn-light border p-3 ${
          tool === "line" ? "active" : ""
        }`}>
        <HorizontalRuleOutlinedIcon fontSize="large" color="primary" />
        <input
          type="radio"
          name="tool"
          id="line"
          checked={tool === "line"}
          value="line"
          style={{ opacity: "0", width: "0px" }}
          onChange={(e) => setTool(e.target.value)}
        />
      </label>
      <label htmlFor="rect" className={`btn btn-light border p-3 ${
          tool === "rect" ? "active" : ""
        }`}>
        <RectangleOutlinedIcon fontSize="large" color="primary" />
        <input
          type="radio"
          name="tool"
          id="rect"
          checked={tool === "rect"}
          style={{ opacity: "0", width: "0" }}
          value="rect"
          onChange={(e) => setTool(e.target.value)}
        />
      </label>
      <label htmlFor="circle" className={`btn btn-light border p-3 ${
          tool === "circle" ? "active" : ""
        }`}>
        <CircleOutlinedIcon fontSize="large" color="primary" />
        <input
          type="radio"
          name="tool"
          id="circle"
          checked={tool === "circle"}
          style={{ opacity: "0", width: "0" }}
          value="circle"
          onChange={(e) => setTool(e.target.value)}
        />
      </label>
      <label htmlFor="color" className="btn btn-light border">
        <ColorLensOutlinedIcon fontSize="large" color="primary" />
        <input
          type="color"
          id="color"
          style={{
            border: "none",
            width: "30px",
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
