import React from "react";
import chroma from "chroma-js"

const FeaturesSection = ({ onExportClick, onDownloadClick, onHistoryClick, palette, hasHistory }) => {
  // Helper function to determine optimal text color for any background
  const getTextColor = (backgroundColor) => {
    // Use a higher contrast threshold (4.5) for better accessibility (WCAG AA standard)
    return chroma.contrast(backgroundColor, '#ffffff') >= 4.5 ? '#ffffff' : '#000000';
  };

  return (
    <div className="features-container" style={{ width: "50%", padding: "1rem" }}>
      <h2>Like what you see?</h2>
      <div className="features-buttons" style={{width: "50%"}}>
      <button 
        className="export-btn" 
        onClick={onExportClick} 
        style={{color: getTextColor(palette.primary) }}
      >Save
        <span className="material-icons">save</span>
      </button>
      <button 
        className="download-btn" 
        onClick={onDownloadClick} 
        style={{color: getTextColor(palette.secondary) }}
      >Download
        <span className="material-icons">download</span>
      </button>
      <button 
        className="history-btn" 
        onClick={onHistoryClick} 
        style={{
          color: getTextColor(palette.accent),
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