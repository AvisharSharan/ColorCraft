import React from "react";
import chroma from "chroma-js";

const ButtonPreview = ({ palette }) => (
  <div className="button-preview">
    <button 
      style={{ 
        width: "190px",
        fontWeight: "bold",
        backgroundColor: palette.primary, 
        color: chroma.contrast(palette.primary, '#ffffff') > 2.5 ? '#ffffff' : palette.text 
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
        color: chroma.contrast(palette.secondary, '#ffffff') > 2.5 ? '#ffffff' : palette.text  
      }} 
      className="secondary-btn"
    >
      Secondary Button
    </button>
  </div>
);

export default ButtonPreview;