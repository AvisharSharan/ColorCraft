import React from "react";
import chroma from "chroma-js"

const FeaturesSection = ({ onExportClick, onDownloadClick, palette }) => (
  <div className="features-container" style={{ width: "50%", padding: "1rem" }}>
    <h2>Like what you see?</h2>
    <div className="features-buttons" style={{width: "50%"}}>
    <button 
      className="export-btn" 
      onClick={onExportClick} 
      style={{color: chroma.contrast(palette.primary, '#ffffff') > 2.5 ? '#ffffff' : palette.text }}
    >Save
      <span className="material-icons">save</span>
    </button>
    <button 
      className="download-btn" 
      onClick={onDownloadClick} 
      style={{color: chroma.contrast(palette.secondary, '#ffffff') > 2.5 ? '#ffffff' : palette.text }}
    >Download
      <span className="material-icons">download</span>
    </button>

    </div>
  </div>
);

export default FeaturesSection;