import React from "react";

const FeaturesSection = ({ onExportClick, onDownloadClick }) => (
  <div className="features-container" style={{ width: "50%", padding: "1rem" }}>
    <h2>Like what you see?</h2>
    <div className="features-buttons" style={{width: "50%"}}>
    <button 
      className="export-btn" 
      onClick={onExportClick}
    >Save
      <span className="material-icons">save</span>
    </button>
    <button 
      className="download-btn" 
      onClick={onDownloadClick}
    >Download
      <span className="material-icons">download</span>
    </button>

    </div>
  </div>
);

export default FeaturesSection;