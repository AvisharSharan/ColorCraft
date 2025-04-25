import { useState, useEffect } from "react";
import ThemePreview from "./components/ThemePreview";
import Toolbar from "./components/Toolbar";
import "./styles/App.css";
import chroma from "chroma-js";

function App() {
  const [palette, setPalette] = useState({
    text: "#1a1a1a",
    background: "#f5f5f5",
    primary: "#ff5722",
    secondary: "#03a9f4",
    accent: "#8bc34a"
  });

  const [paletteHistory, setPaletteHistory] = useState([]);

  useEffect(() => {
    document.documentElement.style.setProperty("--background", palette.background);
  }, [palette.background]);

  return (
    <div className="app">
      <Toolbar 
        palette={palette} 
        setPalette={(newPalette) => {
          setPalette(newPalette);
        }} 
        generatePalette={() => {
          const base = chroma.random().saturate(2).brighten(1);
          const baseHue = base.get('hsl.h');
          const baseSat = base.get('hsl.s');
          const baseLum = base.get('hsl.l');

          const background = base.set('hsl.s', 0.5).brighten(1.5).hex();

          const primary = base.hex();
          const text = chroma(primary).darken(5).hex();
          const secondary = chroma.hsl(baseHue + 20, baseSat * 0.9, baseLum).hex();

          const accent = chroma.hsl(baseHue + 40, Math.min(baseSat + 0.2, 1), baseLum).hex();

          const newPalette = {
            text,
            background,
            primary,
            secondary,
            accent
          };

          setPalette(newPalette);
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
