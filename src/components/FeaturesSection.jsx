import React from "react";
import chroma from "chroma-js";
import "../styles/FeaturesSection.css";

const FeaturesSection = ({ onExportClick, onDownloadClick, palette }) => {
  const getContrastColor = (color) => {
    return chroma.contrast(color, '#ffffff') > 2 ? '#ffffff' : palette.text;
  };

  return (
    <div className="features-container">
      <h3 className="features-title">
        <span className="material-icons">auto_awesome</span>
        Export Options
      </h3>
      
      <div className="features-content">
        <p className="features-description">
          Save your palette as CSS variables or export it as a swatch.
        </p>
        
        <div className="features-buttons">
          <button 
            className="feature-btn export-btn"
            onClick={onExportClick}
            style={{
              background: `linear-gradient(135deg, ${palette.primary}, ${chroma(palette.primary).darken(0.3).hex()})`,
              color: "#fff"
            }}
          >
            <span className="material-icons">content_copy</span>
            <span>Save as CSS</span>
          </button>
          
          <button 
            className="feature-btn download-btn"
            onClick={onDownloadClick}
            style={{
              background: `linear-gradient(135deg, ${palette.secondary}, ${chroma(palette.secondary).darken(0.3).hex()})`,
              color: "#fff"
            }}
          >
            <span className="material-icons">download</span>
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;