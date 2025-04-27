import { useState, useEffect } from "react";
import chroma from "chroma-js";
import Toolbar from "./components/Toolbar";
import ExportModal from "./components/ExportModal";
import "./styles/App.css";

function App() {
  const [palette, setPalette] = useState({
    text: "#1a1a1a",
    background: "#f5f5f5",
    primary: "#ff5722",
    secondary: "#03a9f4",
    accent: "#8bc34a"
  });

  const [showExportPopup, setShowExportPopup] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--text", palette.text);
    document.documentElement.style.setProperty("--background", palette.background);
    document.documentElement.style.setProperty("--primary", palette.primary);
    document.documentElement.style.setProperty("--secondary", palette.secondary);
    document.documentElement.style.setProperty("--accent", palette.accent);

    // Dynamically set the body's background color as a gradient between primary and secondary colors
    document.body.style.background = `linear-gradient(45deg, ${palette.primary}, ${palette.secondary})`;

    // Set the right section's background color to the palette's background color
    document.querySelector(".right-section").style.backgroundColor = palette.background;
  }, [palette]);

  return (
    <div className="app-container">
      <div className="left-section" style={{ backgroundColor: palette.background }}>
        <div className="typography-preview">
          <h1 style={{ color: palette.primary }}>Typography Preview</h1>
          <p style={{ color: palette.text }}>
            This is a paragraph example with clean and modern styling. Check out the
            <span style={{ marginLeft: "0.5rem" }}>
              <a href="#" style={{ color: palette.accent }}>accent color</a>
            </span>.
          </p>
        </div>
        <div className="button-preview">
          <button 
            style={{ 
              backgroundColor: palette.primary, 
              color: chroma.contrast(palette.primary, '#ffffff') > 4.5 ? '#ffffff' : '#000000' 
            }} 
            className="primary-btn"
          >
            Primary Button
          </button>
          <button 
            style={{ 
              backgroundColor: palette.secondary, 
              color: chroma.contrast(palette.secondary, '#ffffff') > 4.5 ? '#ffffff' : '#000000' 
            }} 
            className="secondary-btn"
          >
            Secondary Button
          </button>
        </div>
      </div>
      <div className="right-section">
        <div className="palette-container">
          {Object.entries(palette).map(([key, color]) => (
            <div
              key={key}
              className="color-block"
              style={{ backgroundColor: color }}
            >
              <p className="color-hex">{color}</p>
            </div>
          ))}
        </div>
        <div className="features-container" style={{ width: "50%", padding: "1rem" }}>
          <button 
            className="export-btn" 
            onClick={() => setShowExportPopup(true)}
          >
            Save/Export Palette
          </button>
          {showExportPopup && (
            <ExportModal 
              palette={palette} 
              onClose={() => setShowExportPopup(false)} 
            />
          )}
        </div>
        <Toolbar 
          onGenerate={() => {
            const base = chroma.random();
            const baseHue = base.get('hsl.h');
            const baseSat = base.get('hsl.s');
            const baseLum = base.get('hsl.l');

            const newPalette = {
              text: base.darken(3).hex(),
              background: base.brighten(3).hex(),
              primary: base.hex(),
              secondary: chroma.hsl((baseHue + 30) % 360, baseSat, baseLum).hex(),
              accent: chroma.hsl((baseHue + 60) % 360, baseSat, baseLum).hex()
            };

            setPalette(newPalette);
          }}
          palette={palette}
        />
      </div>
    </div>
  );
}

export default App;
