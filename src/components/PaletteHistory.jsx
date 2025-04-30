import React from "react";
import "../styles/PaletteHistory.css";

const PaletteHistory = ({ paletteHistory, onClose, onSelectPalette, onClearHistory }) => {
  return (
    <div className="palette-history">
      <h3>Palette History</h3>
      <div className="history-list">
        {paletteHistory.length === 0 ? (
          <p>No history yet. Generate some palettes!</p>
        ) : (
          paletteHistory.map((historyPalette, index) => (
            <div 
              key={historyPalette.timestamp || index} 
              className="history-item"
              onClick={() => onSelectPalette(historyPalette)}
            >
              <div className="history-colors">
                <div style={{ backgroundColor: historyPalette.primary }} className="history-color"></div>
                <div style={{ backgroundColor: historyPalette.secondary }} className="history-color"></div>
                <div style={{ backgroundColor: historyPalette.accent }} className="history-color"></div>
              </div>
              <span className="history-date">
                {new Date(historyPalette.timestamp).toLocaleString() || "Unknown date"}
              </span>
            </div>
          ))
        )}
      </div>
      <div className="history-buttons">
        <button className="close-history" onClick={onClose}>Close</button>
        {paletteHistory.length > 0 && (
          <button 
            className="clear-history" 
            onClick={onClearHistory}
            title="Delete all palette history"
          >
            Clear History
          </button>
        )}
      </div>
    </div>
  );
};

export default PaletteHistory;