import React, { useState } from "react";
import chroma from "chroma-js";
import "../styles/ExportModal.css";

const ExportModal = ({ palette, onClose }) => {
  const [showExportPopup, setShowExportPopup] = useState(true);
  const [copied, setCopied] = useState(false);
  
  const cssText = `:root {\n  --text: ${palette.text};\n  --background: ${palette.background};\n  --primary: ${palette.primary};\n  --secondary: ${palette.secondary};\n  --accent: ${palette.accent};\n}`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(cssText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    showExportPopup && (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>
              <span className="material-icons">code</span>
              Export Palette
            </h3>
          </div>
          
          <div className="modal-body">
            <div className="code-container">
              <pre className="code-block">
                <code>{cssText}</code>
              </pre>
            </div>
          </div>
          
          <div className="modal-footer">
            <button 
              className="copy-btn"
              onClick={handleCopy}
              style={{
                background: copied ? `${palette.accent}` : `${palette.primary}`,
              }}
            >
              <span className="material-icons">{copied ? 'check' : 'content_copy'}</span>
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button className="close-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ExportModal;