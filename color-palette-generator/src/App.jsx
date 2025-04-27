import { useState, useEffect } from "react";
import chroma from "chroma-js";
import Toolbar from "./components/Toolbar";
import ExportModal from "./components/ExportModal";
import TypographyPreview from "./components/TypographyPreview";
import ButtonPreview from "./components/ButtonPreview";
import PaletteDisplay from "./components/PaletteDisplay";
import FeaturesSection from "./components/FeaturesSection";
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
        <TypographyPreview palette={palette} />
        <ButtonPreview palette={palette} />
      </div>
      <div className="right-section">
        <PaletteDisplay palette={palette} />
        <FeaturesSection onExportClick={() => setShowExportPopup(true)} />
        {showExportPopup && (
          <ExportModal 
            palette={palette} 
            onClose={() => setShowExportPopup(false)} 
          />
        )}
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
