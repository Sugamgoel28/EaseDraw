import { useEffect, useState, useRef, useLayoutEffect } from "react";
import rough from "roughjs";
import Toolbar from "../Toolbar";
import Shortcuts from "../KeyboardShortcuts/Shortcuts";
import Placeholder from "../Placeholder/Placeholder";

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

  useLayoutEffect(() => {
    if (canvasRef) {
      const roughCanvas = rough.canvas(canvasRef.current);

      if (elements.length > 0) {
        ctxRef.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }
      elements.forEach((element) => {
        if (element.type === "pencil") {
          roughCanvas.linearPath(element.path, {
            stroke: element.stroke,
            strokeWidth: 2,
            roughness: 0,
          });
        } else if (element.type === "line") {
          roughCanvas.draw(
            roughGenerator.line(
              element.offsetX,
              element.offsetY,
              element.width,
              element.height,
              {
                stroke: element.stroke,
                strokeWidth: 2,
                roughness: 0,
              }
            )
          );
        } else if (element.type === "rect") {
          roughCanvas.draw(
            roughGenerator.rectangle(
              element.offsetX,
              element.offsetY,
              element.width,
              element.height,
              {
                stroke: element.stroke,
                strokeWidth: 2,
                roughness: 0,
              }
            )
          );
        } else if (element.type === "circle") {
          roughCanvas.draw(
            roughGenerator.circle(
              element.offsetX,
              element.offsetY,
              element.diameter,
              {
                stroke: element.stroke,
                strokeWidth: 2,
                roughness: 0,
              }
            )
          );
        }
      });
    }
  }, [elements]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "pencil") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "pencil",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: color,
        },
      ]);
    } else if (tool === "line") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "line",
          offsetX,
          offsetY,
          width: offsetX,
          height: offsetY,
          stroke: color,
        },
      ]);
    } else if (tool === "rect") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "rect",
          offsetX,
          offsetY,
          width: 0,
          height: 0,
          stroke: color,
        },
      ]);
    } else if (tool === "circle") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "circle",
          offsetX,
          offsetY,
          diameter: 0,
          stroke: color,
        },
      ]);
    }
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (isDrawing) {
      if (tool === "pencil") {
        const { path } = elements[elements.length - 1];
        const newPath = [...path, [offsetX, offsetY]];

        setElements((prevElements) =>
          prevElements.map((element, index) => {
            if (index === elements.length - 1) {
              return {
                ...element,
                path: newPath,
              };
            } else {
              return element;
            }
          })
        );
      } else if (tool === "line") {
        setElements((prevElements) =>
          prevElements.map((element, index) => {
            if (index === elements.length - 1) {
              return {
                ...element,
                width: offsetX,
                height: offsetY,
              };
            } else {
              return element;
            }
          })
        );
      } else if (tool === "rect") {
        setElements((prevElements) =>
          prevElements.map((element, index) => {
            if (index === elements.length - 1) {
              return {
                ...element,
                width: offsetX - element.offsetX,
                height: offsetY - element.offsetY,
              };
            } else {
              return element;
            }
          })
        );
      } else if (tool === "circle") {
      setElements((prevElements) =>
        prevElements.map((element, index) => {
          if (index === elements.length - 1) {
            const a = Math.abs(offsetX - element.offsetX);
            const b = Math.abs(offsetY - element.offsetY);
            const diameter = Math.sqrt(a * a + b * b)*2;
            return {
              ...element,
              diameter: diameter,
            };
          } else {
            return element;
          }
        })
      );
    }}
  };

  const handleMouseUp = (e) => {
    setIsDrawing(false);
  };

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
            elements={elements}
            setElements={setElements}
            history={history}
            setHistory={setHistory}
            canvasRef={canvasRef}
          />
        )}
      </div>
      <div className="position-absolute bottom-0 end-0 m-4">
        <Shortcuts />
      </div>
      {!hasUserClicked && <Placeholder />}
      <canvas ref={canvasRef} />
    </div>
  );
};

export default WhiteBoard;
