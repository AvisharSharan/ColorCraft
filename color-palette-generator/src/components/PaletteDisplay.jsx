import React from "react";

const PaletteDisplay = ({ palette }) => (
  <div className="palette-container">
    {Object.entries(palette).map(([key, color]) => (
      <div
        key={key}
        className="color-block"
        style={{ backgroundColor: color }}
      >
        <p className="color-hex">{color}</p>
      </div>
    ))}
  </div>
);

export default PaletteDisplay;