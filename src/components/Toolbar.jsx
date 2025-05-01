import React from 'react';
import '../styles/Toolbar.css';
import chroma from 'chroma-js';

const Toolbar = ({ 
  onGenerate, 
  palette, 
  baseColor, 
  setBaseColor, 
  useBaseColor, 
  setUseBaseColor,
  harmonyMode,
  setHarmonyMode,
  onHistoryClick,
  hasHistory
}) => {
  return (
    <div className="toolbar">
      <div className="toolbar-title">
        <h3><span className="material-icons">palette</span> Controls</h3>
      </div>
      
      <div className="toolbar-options">
        <div className="toolbar-row">
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
            <label htmlFor="base-color">Base:</label>
            <input 
              type="color" 
              id="base-color" 
              value={baseColor || "#ffffff"}
              onChange={(e) => setBaseColor(e.target.value)}
              title="Choose a base color for your palette"
            />
          </div>
        </div>

        <div className="toolbar-row">
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
        
        <div className="toolbar-row buttons-row">
            <button 
              className="generate-btn"
              style={{ 
                background: `linear-gradient(90deg, ${palette.secondary}, ${palette.primary})`, 
                color: "#fff"
              }}
              onClick={onGenerate}
            >
              <span className="material-icons">auto_awesome</span>
              Generate
            </button>
          <button 
            className="history-btn"
            onClick={onHistoryClick}
            disabled={!hasHistory}
            style={{
              background: `linear-gradient(90deg, ${palette.accent}, ${chroma(palette.accent).darken(0.3).hex()})`,
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
      <div className="palette-note">
        <p><span className="material-icons">tips_and_updates</span>Colors are subjective! If the palette is unusual, try using a different color or harmony type.</p>
      </div>
    </div>
  );
};

export default Toolbar;