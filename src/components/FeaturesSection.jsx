import React from "react";
import chroma from "chroma-js";
import "../styles/FeaturesSection.css";

const FeaturesSection = ({ onExportClick, onDownloadClick, onHistoryClick, palette, hasHistory }) => {
  const getContrastColor = (color) => {
    return chroma.contrast(color, '#ffffff') > 2 ? '#ffffff' : palette.text;
  };

  return (
    <div className="features-container">
      <h3 className="features-title">
        <span className="material-icons">auto_awesome</span>
        Export Options
      </h3>
      
      <div className="features-description">
        Save your palette as CSS variables, export it as a swatch, or view your generation history.
      </div>
      
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
        
        <button 
          className="feature-btn history-btn"
          onClick={onHistoryClick}
          disabled={!hasHistory}
          style={{
            background: `linear-gradient(135deg, ${palette.accent}, ${chroma(palette.accent).darken(0.3).hex()})`,
            color: "#fff",
            opacity: hasHistory ? 1 : 0.7
          }}
          title={!hasHistory ? "Generate palettes to build history" : "View previous palettes"}
        >
          <span className="material-icons">history</span>
          <span>History</span>
        </button>
      </div>
    </div>
  );
};

export default FeaturesSection;