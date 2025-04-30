import React, { useState } from "react";
import chroma from "chroma-js";
import "../styles/ExportModal.css";

const ExportModal = ({ palette, onClose }) => {
  const [showExportPopup, setShowExportPopup] = useState(true);

  return (
    showExportPopup && (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h3>Export Palette</h3>
          <div style={{ marginTop: "1rem" }}>
            <textarea
              readOnly
              value={`:root {\n  --text: ${palette.text};\n  --background: ${palette.background};\n  --primary: ${palette.primary};\n  --secondary: ${palette.secondary};\n  --accent: ${palette.accent};\n}`}
              style={{ width: "100%", height: "200px", overflow: "hidden" }}
            />
          </div>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(
                `:root {\n  --text: ${palette.text};\n  --background: ${palette.background};\n  --primary: ${palette.primary};\n  --secondary: ${palette.secondary};\n  --accent: ${palette.accent};\n}`
              );
              alert('Palette copied to clipboard!');
            }}
            style={{ marginRight: "1rem" }}
          >
            Copy
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    )
  );
};

export default ExportModal;