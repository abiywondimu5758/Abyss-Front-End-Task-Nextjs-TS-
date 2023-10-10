import React, { useState } from "react";
import "./Header.css";

interface HeaderProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRecenter: () => void; // Added function for recentering
  zoomLevel: number;
  onZoomChange: (newZoomLevel: number) => void;
}

const Header: React.FC<HeaderProps> = ({
  onZoomIn,
  onZoomOut,
  onRecenter,
  zoomLevel,
  onZoomChange,
}) => {
  const [clicked, setClicked] = useState(false);

  // Toggle the dropdown when zoom level is clicked
  const handleZoomChoice = () => {
    setClicked((prev) => !prev);
  };

  // Handle selecting a new zoom level from the dropdown
  const handleOption = (newZoomLevel: number) => {
    onZoomChange(newZoomLevel);
    setClicked((prev) => !prev);
  };
  return (
    <div className="header">
      <div className="left-items">
        <div className="title">Services</div>
        <div className="circle">
          <span className="circle-text">0</span>
        </div>
      </div>
      <div className="right-items">
        <button className="rectangle-button">LIST VIEW</button>
        <div className="square-button" onClick={onRecenter}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send"
            viewBox="0 0 16 16"
          >
            {" "}
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />{" "}
          </svg>
        </div>
        <div className="zoom-controls">
          <button className="zoom-button" onClick={onZoomOut}>
            -
          </button>
          <div className="dropdown-container">
            <div className="text-view" onClick={handleZoomChoice}>
              {Math.floor(zoomLevel * 100)}%
            </div>
            {clicked && (
              <div className="dropdown">
                <div onClick={() => handleOption(0.25)}>25%</div>
                <div onClick={() => handleOption(0.3)}>30%</div>
                <div onClick={() => handleOption(0.4)}>40%</div>
                <div onClick={() => handleOption(0.5)}>50%</div>
                <div onClick={() => handleOption(0.6)}>60%</div>
                <div onClick={() => handleOption(0.7)}>70%</div>
                <div onClick={() => handleOption(0.8)}>80%</div>
                <div onClick={() => handleOption(0.9)}>90%</div>
                <div onClick={() => handleOption(1.0)}>100%</div>
                <div onClick={() => handleOption(1.2)}>120%</div>
                <div onClick={() => handleOption(1.3)}>130%</div>
                <div onClick={() => handleOption(1.5)}>150%</div>
              </div>
            )}
          </div>
          <button className="zoom-button" onClick={onZoomIn}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
