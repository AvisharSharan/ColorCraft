import React, { useState } from "react";

const PaletteDisplay = ({ palette }) => {
  const [copiedColor, setCopiedColor] = useState(null);

  const handleColorClick = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="palette-container">
      {Object.entries(palette).map(([key, color]) => (
        <div
          key={key}
          className="color-block"
          style={{ backgroundColor: color }}
          onClick={() => handleColorClick(color)}
        >
          <p className="color-hex">{copiedColor === color ? "Copied!" : color}</p>
        </div>
      ))}
    </div>
  );
};

export default PaletteDisplay;