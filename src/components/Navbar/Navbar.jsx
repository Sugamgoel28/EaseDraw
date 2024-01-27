import "../../App.css"; // Import the CSS file
import githubIcon from "./github.png";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";


const Navbar = () => {
  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };
  return (
    <>
      <div
        className="d-flex position-absolute top-0 end-0 z-2 justify-content-end"
        id="socials"
      >
        <a
          className="hover-effect p-2"
          href="https://github.com/Sugamgoel28/EaseDraw"
        >
          <img
            src={githubIcon}
            alt="GitHub Logo"
            width="40"
            className="d-inline-block align-text-top"
          />
        </a>
        <a
          className="hover-effect p-2"
          href="https://www.linkedin.com/in/sugam-goel-india/"
        >
          <img
            src="https://img.icons8.com/ios-filled/50/linkedin.png"
            alt="LinkedIn Logo"
            width="40"
            className="d-inline-block align-text-top"
          />
        </a>
      <button className="btn border d-inline-block m-2" onClick={toggleFullScreen}>
        <OpenInFullOutlinedIcon fontSize="small"/>
      </button>
      </div>
    </>
  );
};

export default Navbar;
