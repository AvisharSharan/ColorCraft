import { useState, useEffect } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

// Component Imports
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

// Styles Import
import "./styles/App.css";

function App() {
  // =========== STATE MANAGEMENT ==========
  // Core palette state
  const [palette, setPalette] = useState({
    text: "#1a1a1a",
    background: "#f5f5f5",
    primary: "#ff5722",
    secondary: "#03a9f4",
    accent: "#8bc34a"
  });

  // History and tools state
  const [paletteHistory, setPaletteHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showExportPopup, setShowExportPopup] = useState(false);
  
  // Generator options
  const [baseColor, setBaseColor] = useState("#ff5722");
  const [useBaseColor, setUseBaseColor] = useState(false);
  const [harmonyMode, setHarmonyMode] = useState("analogous");

  // Get the palette generator functionality
  const { generatePalette: generateColorPalette } = PaletteGenerator();

  // =========== EFFECTS ==========
  // Load palette history from localStorage on initial load
  useEffect(() => {
    const savedHistory = localStorage.getItem('paletteHistory');
    if (savedHistory) {
      setPaletteHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save palette history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('paletteHistory', JSON.stringify(paletteHistory));
  }, [paletteHistory]);

  // Apply the current palette to the CSS variables and DOM elements
  useEffect(() => {
    // Set CSS variables
    document.documentElement.style.setProperty("--text", palette.text);
    document.documentElement.style.setProperty("--background", palette.background);
    document.documentElement.style.setProperty("--primary", palette.primary);
    document.documentElement.style.setProperty("--secondary", palette.secondary);
    document.documentElement.style.setProperty("--accent", palette.accent);

    // Apply background gradient and update section background
    document.body.style.background = `linear-gradient(45deg, ${palette.primary}, ${palette.secondary})`;
    document.querySelector(".right-section").style.backgroundColor = palette.background;
  }, [palette]);

  // =========== PALETTE HANDLING ==========
  /**
   * Generates a new color palette based on user preferences
   */
  const handleGeneratePalette = () => {
    const newPalette = generateColorPalette(harmonyMode, baseColor, useBaseColor);
    setPalette(newPalette);
    addToHistory(newPalette);
  };

  // =========== HISTORY MANAGEMENT ==========
  /**
   * Adds a new palette to history with timestamp
   * @param {Object} newPalette - The palette to add to history
   */
  const addToHistory = (newPalette) => {
    // Add timestamp to identify when this palette was created
    const paletteWithTimestamp = {
      ...newPalette,
      timestamp: new Date().toISOString(),
      harmonyMode: harmonyMode
    };
    
    // Keep only the last 10 palettes in history to avoid excessive storage
    setPaletteHistory(prevHistory => {
      const updatedHistory = [paletteWithTimestamp, ...prevHistory];
      return updatedHistory.slice(0, 10);
    });
  };

  /**
   * Applies a palette from history to the current palette
   * @param {Object} historyPalette - The palette from history to apply
   */
  const applyHistoryPalette = (historyPalette) => {
    // Remove timestamp property before applying the palette
    const { timestamp, harmonyMode: paletteHarmonyMode, ...cleanPalette } = historyPalette;
    setPalette(cleanPalette);
    // Optionally update the harmony mode to match the selected palette
    if (paletteHarmonyMode) {
      setHarmonyMode(paletteHarmonyMode);
    }
    setShowHistory(false);
  };

  /**
   * Clears all palette history
   */
  const clearHistory = () => {
    setPaletteHistory([]);
    console.log("Palette history cleared");
  };

  // =========== FILE OPERATIONS ==========
  /**
   * Downloads the current palette as a ZIP file with CSS and PNG
   */
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

  // =========== RENDER ==========
  return (
    <div className="app-container">
      <Header />

      <div className="main-app">
        {/* Preview Section */}
        <div className="left-section" style={{ backgroundColor: palette.background }}>
          <TypographyPreview palette={palette} />
          <ButtonPreview palette={palette} />
        </div>

        {/* Controls Section */}
        <div className="right-section">
          <PaletteDisplay palette={palette} />
          
          {/* Modals */}
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

          {/* Action Buttons */}
          <FeaturesSection 
            onExportClick={() => setShowExportPopup(true)} 
            onDownloadClick={handleDownload} 
            palette={palette}
            onHistoryClick={() => setShowHistory(true)}
            hasHistory={paletteHistory.length > 0}
          />
          
          {/* Palette Generator Controls */}
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
