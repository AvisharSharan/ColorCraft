import React from "react";
import "../styles/PaletteHistory.css";

function PaletteHistory({ paletteHistory, setPalette }) {
  return (
    <div className="palette-history">
      <h2>Palette History</h2>
      <div className="history-grid">
        {paletteHistory.map((palette, index) => (
          <div
            key={index}
            className="palette-card"
            onClick={() => setPalette(palette)}
            title="Click to apply this palette"
          >
            {Object.entries(palette).map(([key, value]) => (
              <div
                key={key}
                className="palette-swatch"
                style={{ backgroundColor: value }}
              >
                <span>{key}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaletteHistory;