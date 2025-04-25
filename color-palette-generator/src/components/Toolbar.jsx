import React from "react";
import "../styles/Toolbar.css";

function Toolbar({ palette, setPalette, generatePalette }) {
  const handleColorChange = (key, value) => {
    setPalette({ ...palette, [key]: value });
  };

  return (
    <div className="toolbar">
      {Object.entries(palette).map(([key, value]) => (
        <div key={key} className="toolbar-item">
          <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
          <input
            type="color"
            value={value}
            onChange={(e) => handleColorChange(key, e.target.value)}
          />
        </div>
      ))}
      <button className="generate-btn" onClick={generatePalette}>
        Generate
      </button>
    </div>
  );
}

export default Toolbar;