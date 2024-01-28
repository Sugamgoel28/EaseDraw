import { useEffect, useState, useRef, useLayoutEffect } from "react";
import rough from "roughjs";
import Toolbar from "../Toolbar";
import Shortcuts from "../KeyboardShortcuts/Shortcuts";
import Placeholder from "../Placeholder/Placeholder";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

const roughGenerator = rough.generator();

const WhiteBoard = ({ isToolbarVisible }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("black");

  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);

  const [isDrawing, setIsDrawing] = useState(false);
  const [hasUserClicked, setHasUserClicked] = useState(false);

  const undo = () => {
    e.preventDefault();
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
    e.preventDefault();
    setElements((prevElements) => [
      ...prevElements,
      history[history.length - 1],
    ]);
    setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (isDrawing) {
      setElements((prevElements) =>
        prevElements.map((element, index) => {
          if (index === elements.length - 1) {
            let updatedElement;

            switch (tool) {
              case "pencil":
                updatedElement = {
                  ...element,
                  path: [...element.path, [offsetX, offsetY]],
                };
                break;
              case "line":
                updatedElement = {
                  ...element,
                  width: offsetX,
                  height: offsetY,
                };
                break;
              case "rect":
                updatedElement = {
                  ...element,
                  width: offsetX - element.offsetX,
                  height: offsetY - element.offsetY,
                };
                break;
              case "circle":
                const a = Math.abs(offsetX - element.offsetX);
                const b = Math.abs(offsetY - element.offsetY);
                const diameter = Math.sqrt(a * a + b * b) * 2;
                updatedElement = { ...element, diameter };
                break;
              case "ellipse":
                updatedElement = {
                  ...element,
                  width: offsetX - element.offsetX,
                  height: offsetY - element.offsetY,
                };
                break;
              default:
                updatedElement = element;
            }

            return updatedElement;
          } else {
            return element;
          }
        })
      );
    }
  };

  const handleMouseUp = (e) => {
    setIsDrawing(false);
  };

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    const newElement = {
      offsetX,
      offsetY,
      stroke: color,
    };

    switch (tool) {
      case "pencil":
        newElement.type = "pencil";
        newElement.path = [[offsetX, offsetY]];
        break;
      case "line":
        newElement.type = "line";
        newElement.width = offsetX;
        newElement.height = offsetY;
        break;
      case "rect":
        newElement.type = "rect";
        newElement.width = 0;
        newElement.height = 0;
        break;
      case "circle":
        newElement.type = "circle";
        newElement.diameter = 0;
        break;
      case "ellipse":
        newElement.type = "ellipse";
        newElement.width = 0;
        newElement.height = 0;
        break;
      default:
        return;
    }

    setElements((prevElements) => [...prevElements, newElement]);
    setIsDrawing(true);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "whiteboard.png";

    // Trigger a click on the link to start the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillRect = "white";
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setElements([]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    const handleUserClick = () => {
      setHasUserClicked(true);
    };

    document.body.addEventListener("click", handleUserClick);

    return () => {
      document.body.removeEventListener("click", handleUserClick);
    };
  }, []);

  useEffect(() => {
    ctxRef.current.strokeStyle = color;
  }, [color]);

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
          case "e":
            setTool("ellipse");
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

  useLayoutEffect(() => {
    const drawElement = (roughCanvas, element) => {
      const options = {
        stroke: element.stroke,
        strokeWidth: 2,
        roughness: 0,
      };

      switch (element.type) {
        case "pencil":
          roughCanvas.linearPath(element.path, options);
          break;
        case "line":
          roughCanvas.draw(
            roughGenerator.line(
              element.offsetX,
              element.offsetY,
              element.width,
              element.height,
              options
            )
          );
          break;
        case "rect":
          roughCanvas.draw(
            roughGenerator.rectangle(
              element.offsetX,
              element.offsetY,
              element.width,
              element.height,
              options
            )
          );
          break;
        case "circle":
          roughCanvas.draw(
            roughGenerator.circle(
              element.offsetX,
              element.offsetY,
              element.diameter,
              options
            )
          );
          break;
        case "ellipse":
          roughCanvas.draw(
            roughGenerator.ellipse(
              element.offsetX,
              element.offsetY,
              element.width,
              element.height,
              options
            )
          );
          break;
        default:
          break;
      }
    };

    if (canvasRef && elements.length > 0) {
      const roughCanvas = rough.canvas(canvasRef.current);
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      elements.forEach((element) => drawElement(roughCanvas, element));
    }
  }, [elements]);

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="bg-white w-100 h-100 overflow-hidden"
    >
      <div
        className="d-flex flex-col justify-content-start mx-2"
        style={{ position: "absolute", top: "10vh" }}
      >
        {isToolbarVisible && (
          <Toolbar
            tool={tool}
            setTool={setTool}
            color={color}
            setColor={setColor}
            handleClearCanvas={handleClearCanvas}
          />
        )}
      </div>

      <div className="position-absolute bottom-0 end-0 gap-3 m-4 d-flex align-items-end">
        <div>
          <button
            className="btn btn-light border p-2 rounded-end-0"
            disabled={elements.length === 0}
            onClick={() => undo()}
          >
            <UndoIcon />
          </button>
          <button
            className="btn btn-light border p-2 border-start-0 rounded-start-0 "
            disabled={history.length < 1}
            onClick={() => redo()}
          >
            <RedoIcon />
          </button>
        </div>
        <button className="btn btn-light border p-2" onClick={handleDownload}>
          <FileDownloadOutlinedIcon />
        </button>
        <Shortcuts />
      </div>
      {!hasUserClicked && <Placeholder />}
      <canvas ref={canvasRef} />
    </div>
  );
};

export default WhiteBoard;
