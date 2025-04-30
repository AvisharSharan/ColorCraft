import { useState, useEffect } from "react";
import chroma from "chroma-js";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import Toolbar from "./components/Toolbar";
import ExportModal from "./components/ExportModal";
import TypographyPreview from "./components/TypographyPreview";
import ButtonPreview from "./components/ButtonPreview";
import PaletteDisplay from "./components/PaletteDisplay";
import PaletteHistory from "./components/PaletteHistory";
import FeaturesSection from "./components/FeaturesSection";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./styles/App.css";

function App() {
  const [palette, setPalette] = useState({
    text: "#1a1a1a",
    background: "#f5f5f5",
    primary: "#ff5722",
    secondary: "#03a9f4",
    accent: "#8bc34a"
  });

  const [paletteHistory, setPaletteHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showExportPopup, setShowExportPopup] = useState(false);
  const [baseColor, setBaseColor] = useState("#ff5722");
  const [useBaseColor, setUseBaseColor] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('paletteHistory');
    if (savedHistory) {
      setPaletteHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('paletteHistory', JSON.stringify(paletteHistory));
  }, [paletteHistory]);

  useEffect(() => {
    document.documentElement.style.setProperty("--text", palette.text);
    document.documentElement.style.setProperty("--background", palette.background);
    document.documentElement.style.setProperty("--primary", palette.primary);
    document.documentElement.style.setProperty("--secondary", palette.secondary);
    document.documentElement.style.setProperty("--accent", palette.accent);

    document.body.style.background = `linear-gradient(45deg, ${palette.primary}, ${palette.secondary})`;
    document.querySelector(".right-section").style.backgroundColor = palette.background;
  }, [palette]);

  const generatePalette = () => {
    try {
      const base = useBaseColor ? chroma(baseColor) : chroma.random();

      const newPalette = {
        primary: base.hex(),
        secondary: base.set('hsl.h', (base.get('hsl.h') + 30) % 360).hex(),
        accent: base.set('hsl.h', (base.get('hsl.h') + 60) % 360).hex(),
        background: base.set('hsl.l', Math.min(0.95, base.get('hsl.l') + 0.3)).hex(),
        text: base.set('hsl.l', Math.max(0.15, base.get('hsl.l') - 0.3)).hex()
      };

      setPalette(newPalette);
      addToHistory(newPalette);
    } catch (error) {
      console.error("Error generating palette:", error);
      generateFallbackPalette();
    }
  };

  const generateFallbackPalette = () => {
    const randomBase = chroma.random();
    const fallbackPalette = {
      primary: randomBase.hex(),
      secondary: randomBase.set('hsl.h', (randomBase.get('hsl.h') + 30) % 360).hex(),
      accent: randomBase.set('hsl.h', (randomBase.get('hsl.h') + 60) % 360).hex(),
      background: randomBase.set('hsl.l', Math.min(0.95, randomBase.get('hsl.l') + 0.3)).hex(),
      text: randomBase.set('hsl.l', Math.max(0.15, randomBase.get('hsl.l') - 0.3)).hex()
    };
    
    setPalette(fallbackPalette);
    addToHistory(fallbackPalette);
  };

  const addToHistory = (newPalette) => {
    const paletteWithTimestamp = {
      ...newPalette,
      timestamp: new Date().toISOString()
    };
    
    setPaletteHistory(prevHistory => {
      const updatedHistory = [paletteWithTimestamp, ...prevHistory];
      return updatedHistory.slice(0, 10);
    });
  };

  const applyHistoryPalette = (historyPalette) => {
    const { timestamp, ...cleanPalette } = historyPalette;
    setPalette(cleanPalette);
    setShowHistory(false);
  };

  const clearHistory = () => {
    setPaletteHistory([]);
    console.log("Palette history cleared");
  };

  const handleDownload = async () => {
    const zip = new JSZip();

    const paletteText = `:root {\n  --text: ${palette.text};\n  --background: ${palette.background};\n  --primary: ${palette.primary};\n  --secondary: ${palette.secondary};\n  --accent: ${palette.accent};\n}`;
    zip.file("palette.txt", paletteText);

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

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "palette.zip");
  };

  return (
    <div className="app-container">
      <Header />

      <div className="main-app">
        <div className="left-section" style={{ backgroundColor: palette.background }}>
          <TypographyPreview palette={palette} />
          <ButtonPreview palette={palette} />
        </div>

        <div className="right-section">
          <PaletteDisplay palette={palette} />
          
          {showHistory && (
            <PaletteHistory 
              paletteHistory={paletteHistory}
              onClose={() => setShowHistory(false)}
              onSelectPalette={applyHistoryPalette}
              onClearHistory={clearHistory}
            />
          )}
          
          {showExportPopup && (
            <ExportModal 
              palette={palette} 
              onClose={() => setShowExportPopup(false)} 
            />
          )}

          <FeaturesSection 
            onExportClick={() => setShowExportPopup(true)} 
            onDownloadClick={handleDownload} 
            palette={palette}
            onHistoryClick={() => setShowHistory(true)}
            hasHistory={paletteHistory.length > 0}
          />
          
          <Toolbar 
            onGenerate={generatePalette}
            palette={palette}
            baseColor={baseColor}
            setBaseColor={setBaseColor}
            useBaseColor={useBaseColor}
            setUseBaseColor={setUseBaseColor}
          />
        </div>
      </div>

      <Footer palette={palette} />
    </div>
  );
}

export default App;
