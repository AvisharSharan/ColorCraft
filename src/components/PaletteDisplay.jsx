import React, { useState } from "react";
import chroma from "chroma-js";
import "../styles/PaletteDisplay.css";

const PaletteDisplay = ({ palette }) => {
  const [copiedColor, setCopiedColor] = useState(null);

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  const getTextColor = (bgColor) => {
    return chroma.contrast(bgColor, '#ffffff') > 2 ? '#ffffff' : '#333333';
  };

  const getColorName = (key) => {
    switch(key) {
      case 'primary': return 'Primary';
      case 'secondary': return 'Secondary';
      case 'accent': return 'Accent';
      case 'background': return 'Background';
      case 'text': return 'Text';
      default: return key;
    }
  };

  return (
    <div className="palette-display-wrapper">
      <div className="palette-display-header">
        <h3>
          <span className="material-icons">palette</span>
          Your Color Palette
        </h3>
        <p className="palette-subtitle">Click on any color to copy its hex code</p>
      </div>

      <div className="color-showcase">
        {Object.entries(palette).map(([key, color]) => (
          <div 
            key={key}
            className="color-card" 
            onClick={() => copyToClipboard(color)}
            style={{
              backgroundColor: color,
              color: getTextColor(color)
            }}
          >
            <div className="color-info">
              <span className="color-name">{getColorName(key)}</span>
              <span className="color-hex">{color}</span>
            </div>
            <div className="copy-indicator">
              {copiedColor === color ? (
                <span className="material-icons copy-success">check_circle</span>
              ) : (
                <span className="material-icons copy-icon">content_copy</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="gradient-section">
        <div className="gradient-item">
          <h3>Primary to Secondary</h3>
          <div 
            className="gradient-preview" 
            style={{ background: `linear-gradient(to right, ${palette.primary}, ${palette.secondary})` }}
          ></div>
        </div>
        <div className="gradient-item">
          <h3>Primary to Accent</h3>
          <div 
            className="gradient-preview" 
            style={{ background: `linear-gradient(to right, ${palette.primary}, ${palette.accent})` }}
          ></div>
        </div>
      </div>

      <div className="harmony-info">
        <div className="info-badge">
          <span className="material-icons">tips_and_updates</span>
          <span>Use these colors with CSS variables</span>
        </div>
      </div>
    </div>
  );
};

export default PaletteDisplay;