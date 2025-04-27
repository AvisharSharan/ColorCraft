import React from "react";

const FeaturesSection = ({ onExportClick, onDownloadClick }) => (
  <div className="features-container" style={{ width: "50%", padding: "1rem" }}>
    <button 
      className="export-btn" 
      onClick={onExportClick}
    >Save
      <span className="material-icons">save</span>
    </button>
    <button 
      className="download-btn" 
      onClick={onDownloadClick}
    >
      <span className="material-icons">download</span>
    </button>
  </div>
);

export default FeaturesSection;