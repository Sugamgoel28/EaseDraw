import React, { useState } from "react";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
const Shortcuts = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="btn btn-light border p-2" onClick={handleButtonClick}>
        {!isOpen ? <HelpOutlineOutlinedIcon />: <CloseOutlinedIcon/>}
      </button>
      {isOpen && (
        <>
        
          <table class="table text-center table-striped ">
          <thead>
            <tr>
              <th scope="col">Keyboard Shortcuts</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Pencil</th>
              <td><kbd className="bg-white text-dark border border-dark ">P</kbd></td>
            </tr>
            
            <tr>
              <th scope="row">Line</th>
              <td><kbd className="bg-white text-dark border border-dark ">L</kbd></td>
            </tr>
            
            <tr>
              <th scope="row">Rectangle</th>
              <td><kbd className="bg-white text-dark border border-dark ">R</kbd></td>
            </tr>
            
            <tr>
              <th scope="row">Circle</th>
              <td><kbd className="bg-white text-dark border border-dark ">C</kbd></td>
            </tr>
            
            <tr>
              <th scope="row">Undo</th>
              <td><kbd className="bg-white text-dark border border-dark ">Ctrl</kbd> + <kbd className="bg-white text-dark border border-dark ">Z</kbd></td>
            </tr>
                        
            <tr>
              <th scope="row">Redo</th>
              <td><kbd className="bg-white text-dark border border-dark ">Ctrl</kbd> + <kbd className="bg-white text-dark border border-dark ">Y</kbd></td>
            </tr>
            
            <tr>
              <th scope="row">Clear Canvas</th>
              <td><kbd className="bg-white text-dark border border-dark ">Ctrl</kbd> + <kbd className="bg-white text-dark border border-dark ">D</kbd></td>
            </tr>
            
          </tbody>
        </table>
        </>
      )}
    </div>
  );
};

export default Shortcuts;
