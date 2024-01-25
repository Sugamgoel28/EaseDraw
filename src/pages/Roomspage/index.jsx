import { useState } from "react";
import WhiteBoard from "../../components/Whiteboard";
import Navbar from "../../components/Navbar/Navbar";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const RoomsPage = () => {
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  const handleToggleToolbar = () => {
    setIsToolbarVisible(!isToolbarVisible);
  };

  return (
    <div>
      <Navbar />
      <div className="d-flex flex-row bg-white overflow-hidden">
        <div
          className="overflow-hidden"
          style={{ height: "100vh", width: "100vw", zIndex: "0" }}
        >
          <WhiteBoard isToolbarVisible={isToolbarVisible} />
        </div>
      </div>
      <button
        className="btn p-3 text-primary"
        onClick={handleToggleToolbar}
        style={{
          position: "absolute",
          opacity: "0.8",
          top: "0vh",
          left: "1vh",
          zIndex: "20",
        }}
      >
        {isToolbarVisible ? (
          <VisibilityOffOutlinedIcon fontSize="large" />
        ) : (
          <VisibilityOutlinedIcon fontSize="large" />
        )}
      </button>
    </div>
  );
};

export default RoomsPage;
