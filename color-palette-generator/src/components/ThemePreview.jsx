import React from "react";
import "../styles/ThemePreview.css";

function ThemePreview({ palette }) {
  const colors = [
    { hex: palette.background },
    { hex: palette.primary },
    { hex: palette.secondary },
    { hex: palette.accent },
  ];

  return (
    <div className="palette-container">
      {colors.map((color, index) => (
        <div
          key={index}
          className="color-block"
          style={{ backgroundColor: color.hex }}
        >
          <p className="color-hex">{color.hex}</p>
        </div>
      ))}
    </div>
  );
}

export default ThemePreview;
