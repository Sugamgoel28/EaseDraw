import "../../App.css"; // Import the CSS file

const Navbar = () => {
  return (
    <>
      <div
        className="d-flex position-absolute top-0 end-0 z-2 justify-content-end"
        id="socials"
      >
        <a className="hover-effect p-2" href="">
          <img
            src="./github.png"
            alt="GitHub Logo"
            width="40"
            className="d-inline-block align-text-top"
          />
        </a>
        <a className="hover-effect p-2" href="#">
          <img
            src="https://img.icons8.com/ios-filled/50/linkedin.png"
            alt="LinkedIn Logo"
            width="40"
            className="d-inline-block align-text-top"
          />
        </a>
      </div>
    </>
  );
};

export default Navbar;
