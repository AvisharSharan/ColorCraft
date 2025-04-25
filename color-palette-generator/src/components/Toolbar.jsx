import React from 'react';
import '../styles/Toolbar.css';

const Toolbar = ({ onColorChange, onGenerate }) => {
  return (
    <div className="toolbar">
      <div className="toolbar-item">
        <label htmlFor="colorPicker">Pick a color:</label>
        <input
          type="color"
          id="colorPicker"
          onChange={(e) => onColorChange(e.target.value)}
        />
      </div>
      <button className="generate-btn" onClick={onGenerate}>
        Generate Palette
      </button>
    </div>
  );
};

export default Toolbar;