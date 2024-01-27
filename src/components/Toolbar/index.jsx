import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
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
  elements,
  setElements,
  history,
  setHistory,
  canvasRef,
}) => {
  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillRect = "white";
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setElements([]);
  };

  const undo = () => {
    setHistory((prevHistory) => [
      ...prevHistory,
      elements[elements.length - 1],
    ]);
    if (elements.length === 1) handleClearCanvas();
    setElements((prevElements) =>
      prevElements.slice(0, prevElements.length - 1)
    );
  };

  const redo = () => {
    setElements((prevElements) => [
      ...prevElements,
      history[history.length - 1],
    ]);
    setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if the Ctrl (Cmd on Mac) key is pressed
      const isCtrlPressed = event.ctrlKey || event.metaKey;

      // Check for keyboard shortcuts
      if (isCtrlPressed) {
        switch (event.key.toLowerCase()) {
          case "z":
            // Undo shortcut (Ctrl + Z)
            event.preventDefault();
            undo();
            break;
          case "y":
            // Redo shortcut (Ctrl + Y)
            event.preventDefault();
            redo();
            break;
          case "d":
            // Clear canvas shortcut (Ctrl + D)
            event.preventDefault();
            handleClearCanvas();
            break;

          default:
            break;
        }
      } else {
        // Check for tool shortcuts without Ctrl
        switch (event.key.toLowerCase()) {
          case "p":
            // Set pencil tool (P key)
            setTool("pencil");
            break;
          case "l":
            // Set line tool (L key)
            setTool("line");
            break;
          case "r":
            // Set rectangle tool (R key)
            setTool("rect");
            break;
          case "c":
            setTool("circle");
            break;

          default:
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [undo, redo, handleClearCanvas, setTool]);

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
      <button
        className="btn btn-light border text-primary py-4"
        disabled={elements.length === 0}
        onClick={() => undo()}
      >
        <UndoIcon color="primary" />
      </button>
      <button
        className="btn btn-light border py-4"
        disabled={history.length < 1}
        onClick={() => redo()}
      >
        <RedoIcon color="primary" />
      </button>
      <button className="btn btn-danger p-3" onClick={handleClearCanvas}>
        <DeleteIcon fontSize="large" />
      </button>
    </div>
  );
};

export default Toolbar;
