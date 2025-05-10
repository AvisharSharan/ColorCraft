import "../styles/PaletteHistory.css";

const PaletteHistory = ({ paletteHistory, onClose, onSelectPalette, onClearHistory }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="palette-history" onClick={(e) => e.stopPropagation()}>
        <div className="history-header">
          <h3 className="history-title">
            <span className="material-icons">history</span>
            Palette History
          </h3>
          <button className="close-history" onClick={onClose} aria-label="Close history">
            <span className="material-icons">close</span>
          </button>
        </div>

        <div className="history-list">
          {paletteHistory.length === 0 ? (
            <div className="empty-history">
              <span className="material-icons empty-icon">palette</span>
              <p className="no-history">No palettes saved yet</p>
            </div>
          ) : (
            paletteHistory.map((historyPalette, index) => (
              <div 
                key={historyPalette.timestamp || index} 
                className="history-item"
                onClick={() => onSelectPalette(historyPalette)}
              >
                <div className="history-colors">
                  <div 
                    style={{ backgroundColor: historyPalette.primary }} 
                    className="history-color"
                  ></div>
                  <div 
                    style={{ backgroundColor: historyPalette.secondary }} 
                    className="history-color"
                  ></div>
                  <div 
                    style={{ backgroundColor: historyPalette.accent }} 
                    className="history-color"
                  ></div>
                </div>
                
                <span className="history-date">
                  {formatDate(historyPalette.timestamp) || "Unknown date"}
                </span>
                
                <span className="material-icons apply-icon">arrow_forward</span>
              </div>
            ))
          )}
        </div>

        {paletteHistory.length > 0 && (
          <div className="history-footer">
            <button 
              className="clear-history" 
              onClick={onClearHistory}
            >
              <span className="material-icons">delete</span>
              Clear History
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaletteHistory;