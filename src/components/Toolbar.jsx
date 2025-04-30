import React from 'react';
import '../styles/Toolbar.css';

const Toolbar = ({ onGenerate, palette, baseColor, setBaseColor, useBaseColor, setUseBaseColor }) => {
  return (
    <div className="toolbar">
      <div className="toolbar-options">
        <div className="toggle-container">
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={useBaseColor}
              onChange={() => setUseBaseColor(!useBaseColor)}
            />
            <span className="toggle-slider"></span>
          </label>
          <span className="toggle-label">
            {useBaseColor ? "Use Base Color" : "Random Palettes"}
          </span>
        </div>
        
        {useBaseColor && (
          <div className="color-picker-container">
            <label htmlFor="base-color">Base Color:</label>
            <input 
              type="color" 
              id="base-color" 
              value={baseColor || "#ffffff"}
              onChange={(e) => setBaseColor(e.target.value)}
              title="Choose a base color for your palette"
            />
          </div>
        )}
      </div>
      
      <button 
        className="generate-btn"
        style={{ 
          background: `linear-gradient(90deg, ${palette.secondary}, ${palette.primary})`, 
          color: palette.background 
        }}
        onClick={onGenerate}
      >
        Generate Palette
      </button>
    </div>
  );
};

export default Toolbar;