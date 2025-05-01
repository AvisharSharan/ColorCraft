import { useState, useEffect } from "react";
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
import PaletteGenerator from "./components/PaletteGenerator";

import "./styles/App.css";

function App() {
  const [palette, setPalette] = useState({
    primary: "#ff5722",
    secondary: "#03a9f4",
    accent: "#8bc34a", 
    background: "#f5f5f5",
    text: "#1a1a1a",
  });

  const [paletteHistory, setPaletteHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showExportPopup, setShowExportPopup] = useState(false);
  
  const [baseColor, setBaseColor] = useState("#ff5722");
  const [useBaseColor, setUseBaseColor] = useState(false);
  const [harmonyMode, setHarmonyMode] = useState("analogous");

  const { generatePalette: generateColorPalette } = PaletteGenerator();

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

    // document.body.style.background = `linear-gradient(45deg, ${palette.primary}, ${palette.secondary})`;
    document.body.style.background = `${palette.background}`;
  }, [palette]);
  const handleGeneratePalette = () => {
    const newPalette = generateColorPalette(harmonyMode, baseColor, useBaseColor);
    setPalette(newPalette);
    addToHistory(newPalette);
  };

  const addToHistory = (newPalette) => {
    const paletteWithTimestamp = {
      ...newPalette,
      timestamp: new Date().toISOString(),
      harmonyMode: harmonyMode
    };
    setPaletteHistory(prevHistory => {
      const updatedHistory = [paletteWithTimestamp, ...prevHistory];
      return updatedHistory.slice(0, 10);
    });
  };

  const applyHistoryPalette = (historyPalette) => {
    const { timestamp, harmonyMode: paletteHarmonyMode, ...cleanPalette } = historyPalette;
    setPalette(cleanPalette);
    if (paletteHarmonyMode) {
      setHarmonyMode(paletteHarmonyMode);
    }
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
      <Header palette={palette} />

      <div className="main-app">
        <div className="left-section">
          <div className="preview-card">
            <h3><span className="material-icons">format_color_text</span> Typography</h3>
            <TypographyPreview palette={palette} />
          </div>
          
          <div className="preview-card">
            <h3><span className="material-icons">touch_app</span> Buttons</h3>
            <ButtonPreview palette={palette} />
          </div>
        </div>

        <div className="right-section">
          <div className="content-card palette-display-container">
            <PaletteDisplay palette={palette} />
          </div>
          
          <div className="content-card features-section-container">
            <FeaturesSection 
              onExportClick={() => setShowExportPopup(true)} 
              onDownloadClick={handleDownload} 
              palette={palette}
              onHistoryClick={() => setShowHistory(true)}
              hasHistory={paletteHistory.length > 0}
            />
          </div>
          
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
          
          <Toolbar 
            onGenerate={handleGeneratePalette}
            palette={palette}
            baseColor={baseColor}
            setBaseColor={setBaseColor}
            useBaseColor={useBaseColor}
            setUseBaseColor={setUseBaseColor}
            harmonyMode={harmonyMode}
            setHarmonyMode={setHarmonyMode}
          />
        </div>
      </div>

      <Footer palette={palette} />
    </div>
  );
}

export default App;
