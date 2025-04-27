import { useState, useEffect } from "react";
import chroma from "chroma-js";
import JSZip from "jszip";
import { saveAs } from "file-saver";
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

    document.body.style.background = `linear-gradient(45deg, ${palette.primary}, ${palette.secondary})`;

    document.querySelector(".right-section").style.backgroundColor = palette.background;
  }, [palette]);

  const handleDownload = async () => {
    const zip = new JSZip();

    // Add palette codes as a text file
    const paletteText = `:root {\n  --text: ${palette.text};\n  --background: ${palette.background};\n  --primary: ${palette.primary};\n  --secondary: ${palette.secondary};\n  --accent: ${palette.accent};\n}`;
    zip.file("palette.txt", paletteText);

    // Add a placeholder PNG file
    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");
    const colors = Object.values(palette);
    colors.forEach((color, index) => {
      ctx.fillStyle = color;
      ctx.fillRect(index * 100, 0, 100, 100);
    });
    const pngData = canvas.toDataURL("image/png").split(",")[1];
    zip.file("palette.png", pngData, { base64: true });

    // Generate the ZIP file and trigger download
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "palette.zip");
  };

  return (
    <div className="app-container">
      <div className="header">
          <header>ColorCraft</header>
      </div>
      <div className="main-app">
        <div className="left-section" style={{ backgroundColor: palette.background }}>
          <TypographyPreview palette={palette} />
          <ButtonPreview palette={palette} />
        </div>
        <div className="right-section">
          <PaletteDisplay palette={palette} />
          <FeaturesSection 
            onExportClick={() => setShowExportPopup(true)} 
            onDownloadClick={handleDownload} 
            palette={palette}
          />
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
      <div className="footer">
        <footer>Made by Avishar</footer>
      </div>
    </div>
  );
}

export default App;
