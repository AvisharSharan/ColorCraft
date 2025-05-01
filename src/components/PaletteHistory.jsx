import React from "react";
import "../styles/PaletteHistory.css";

const PaletteHistory = ({ paletteHistory, onClose, onSelectPalette, onClearHistory }) => {
  return (
    <div className="palette-history">
      <div className="history-header">
        <h3 className="history-title">
          <span className="material-icons">history</span>
          Palette History
        </h3>
        <button className="close-history" onClick={onClose}>
          <span className="material-icons">close</span>
        </button>
      </div>

      <div className="history-list">
        {paletteHistory.length === 0 ? (
          <p className="no-history">No history yet. Generate some palettes!</p>
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

      <div className="history-footer">
        {paletteHistory.length > 0 && (
          <button 
            className="clear-history" 
            onClick={onClearHistory}
            title="Delete all palette history"
          >
            <span className="material-icons">delete</span>
            Clear History
          </button>
        )}
      </div>
    </div>
  );
};

export default PaletteHistory;