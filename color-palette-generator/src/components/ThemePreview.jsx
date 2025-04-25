import { useState } from "react";
import "../styles/ThemePreview.css";

function ThemePreview({ palette }) {
  const [copiedColor, setCopiedColor] = useState(null);

  const handleCopy = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000); // Reset after 2 seconds
  };

  return (
    <div className="preview-container">
      <div className="preview-left">
        <div className="typography-section">
          <h1>
            <span style={{ color: palette.text }}>Welcome to </span>
            <span style={{ color: palette.primary }}>ColorCraft</span>
          </h1>
          <p style={{ color: palette.text }}>Your ultimate tool for creating stunning color palettes.</p>
        </div>

        <div className="button-section">
          <button style={{ backgroundColor: palette.primary, color: palette.text }}>
            Primary Button
          </button>
          <button style={{ backgroundColor: palette.secondary, color: palette.text }}>
            Secondary Button
          </button>
          <button style={{ backgroundColor: palette.accent, color: palette.text }}>
            Accent Button
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThemePreview;
