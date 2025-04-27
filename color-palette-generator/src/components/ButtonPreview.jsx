import React from "react";
import chroma from "chroma-js";

const ButtonPreview = ({ palette }) => (
  <div className="button-preview">
    <button 
      style={{ 
        backgroundColor: palette.primary, 
        color: chroma.contrast(palette.primary, '#ffffff') > 4.5 ? '#ffffff' : '#000000' 
      }} 
      className="primary-btn"
    >
      Primary Button
    </button>
    <button 
      style={{ 
        backgroundColor: palette.secondary, 
        color: chroma.contrast(palette.secondary, '#ffffff') > 4.5 ? '#ffffff' : '#000000' 
      }} 
      className="secondary-btn"
    >
      Secondary Button
    </button>
  </div>
);

export default ButtonPreview;