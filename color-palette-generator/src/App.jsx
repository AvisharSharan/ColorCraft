import { useState, useEffect } from "react";
import ThemePreview from "./components/ThemePreview";
import PaletteGenerator from "./components/PaletteGenerator";
import Toolbar from "./components/Toolbar";
import "./styles/App.css";
import chroma from "chroma-js";

function App() {
  const [palette, setPalette] = useState({
    text: "#000000",
    background: "#ffffff",
    primary: "#4caf50",
    secondary: "#90caf9",
    accent: "#7e57c2"
  });

  const [paletteHistory, setPaletteHistory] = useState([]);

  const savePaletteToHistory = (newPalette) => {
    setPaletteHistory((prevHistory) => [newPalette, ...prevHistory.slice(0, 9)]); // Keep only the last 10 palettes
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--background", palette.background);
  }, [palette.background]);

  return (
    <div className="app">
      <Toolbar 
        palette={palette} 
        setPalette={(newPalette) => {
          setPalette(newPalette);
          savePaletteToHistory(newPalette);
        }} 
        generatePalette={() => {
          const base = chroma.random().saturate(2).brighten(1);
          const baseHue = base.get('hsl.h');
          const baseSat = base.get('hsl.s');
          const baseLum = base.get('hsl.l');

          // Adjusted background logic to make the color lighter
          const background = base.set('hsl.s', 0.5).brighten(1.5).hex();

          // Set text color to a very dark version of the primary color
          const primary = base.hex();
          const text = chroma(primary).darken(5).hex();
          const secondary = chroma.hsl(baseHue + 20, baseSat * 0.9, baseLum).hex();

          // Adjust accent color logic
          const accent = Math.random() > 0.5
            ? chroma.hsl(baseHue + 40, Math.min(baseSat + 0.2, 1), baseLum).hex() // Same category
            : chroma.hsl((baseHue + 180) % 360, Math.min(baseSat + 0.3, 1), baseLum).hex(); // Complementary

          const newPalette = {
            text,
            background,
            primary,
            secondary,
            accent
          };

          setPalette(newPalette);
          savePaletteToHistory(newPalette);
        }}
      />
      <main className="workspace">
        <section className="preview-area">
          <ThemePreview palette={palette} />
        </section>
      </main>
    </div>
  );
}

export default App;
