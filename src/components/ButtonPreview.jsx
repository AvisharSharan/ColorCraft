import React from "react";
import chroma from "chroma-js";

const ButtonPreview = ({ palette }) => {
  // Helper function to determine optimal text color for any background
  const getTextColor = (backgroundColor) => {
    // Use a higher contrast threshold (4.5) for better accessibility (WCAG AA standard)
    return chroma.contrast(backgroundColor, '#ffffff') >= 4.5 ? '#ffffff' : '#000000';
  };

  return (
    <div className="button-preview">
      <button 
        style={{ 
          width: "190px",
          fontWeight: "bold",
          backgroundColor: palette.primary, 
          color: getTextColor(palette.primary)
        }} 
        className="primary-btn"
      >
        Primary Button
      </button>
      <button 
        style={{ 
          width: "190px",
          fontWeight: "bold",
          backgroundColor: palette.secondary, 
          color: getTextColor(palette.secondary)
        }} 
        className="secondary-btn"
      >
        Secondary Button
      </button>
    </div>
  );
};

export default ButtonPreview;