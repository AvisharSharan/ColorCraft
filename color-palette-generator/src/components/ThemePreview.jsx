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
          <h1 style={{ color: palette.primary }}>Welcome to ColorCraft</h1>
          <p style={{ color: palette.text }}>Your ultimate tool for creating stunning color palettes.</p>
        </div>

        <div className="button-section">
          <button style={{ backgroundColor: palette.primary, color: palette.text }}>
            Primary Action
          </button>
          <button style={{ backgroundColor: palette.secondary, color: palette.text }}>
            Secondary Action
          </button>
          <button style={{ backgroundColor: palette.accent, color: palette.text }}>
            Accent Action
          </button>
        </div>
      </div>

      <div className="preview-right">
        {[
          { name: "Primary-Secondary", colors: [palette.primary, palette.secondary] },
          { name: "Primary-Accent", colors: [palette.primary, palette.accent] },
          { name: "Secondary-Background", colors: [palette.secondary, palette.background] },
        ].map((gradient, index) => (
          <div
            key={index}
            className="gradient-card"
            style={{
              background: `linear-gradient(135deg, ${gradient.colors[0]}, ${gradient.colors[1]})`,
            }}
          >
            <span className="gradient-name">{gradient.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThemePreview;
