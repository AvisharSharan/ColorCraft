import React from "react";
import chroma from "chroma-js"

const FeaturesSection = ({ onExportClick, onDownloadClick, onHistoryClick, palette, hasHistory }) => {

  return (
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
      <button 
        className="history-btn" 
        onClick={onHistoryClick} 
        style={{
          backgroundColor: palette.accent
        }}
        disabled={!hasHistory}
        title={!hasHistory ? "Generate palettes to build history" : "View previous palettes"}
      >History
        <span className="material-icons">history</span>
      </button>
      </div>
    </div>
  );
};

export default FeaturesSection;