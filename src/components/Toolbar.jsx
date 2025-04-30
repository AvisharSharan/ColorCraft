import React from 'react';
import '../styles/Toolbar.css';

const Toolbar = ({ 
  onGenerate, 
  palette, 
  baseColor, 
  setBaseColor, 
  useBaseColor, 
  setUseBaseColor,
  harmonyMode,
  setHarmonyMode
}) => {
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
        
        <div className={`color-picker-container ${!useBaseColor ? 'hidden' : ''}`}>
          <label htmlFor="base-color">Base Color:</label>
          <input 
            type="color" 
            id="base-color" 
            value={baseColor || "#ffffff"}
            onChange={(e) => setBaseColor(e.target.value)}
            title="Choose a base color for your palette"
          />
        </div>

        <div className="harmony-selector">
          <label htmlFor="harmony-mode">Harmony:</label>
          <select 
            id="harmony-mode"
            value={harmonyMode}
            onChange={(e) => setHarmonyMode(e.target.value)}
            title="Choose a color harmony type"
          >
            <option value="analogous">Analogous</option>
            <option value="monochromatic">Monochromatic</option>
            <option value="triadic">Triadic</option>
            <option value="complementary">Complementary</option>
            <option value="split-complementary">Split Complementary</option>
            <option value="tetradic">Tetradic</option>
          </select>
        </div>
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