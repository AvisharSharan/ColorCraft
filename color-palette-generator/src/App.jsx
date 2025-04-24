import { useEffect, useState } from "react";
import PaletteGenerator from "./components/PaletteGenerator";
import ThemePreview from "./components/ThemePreview";
import "./styles/App.css";

function App() {
  const [palette, setPalette] = useState({
    text: "#000000",
    background: "#ffffff",
    primary: "#4caf50",
    secondary: "#90caf9",
    accent: "#7e57c2"
  });

  useEffect(() => {
    document.body.style.backgroundColor = palette.background;
    document.body.style.color = palette.text;
  }, [palette]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--text', palette.text);
    root.style.setProperty('--background', palette.background);
    root.style.setProperty('--primary', palette.primary);
    root.style.setProperty('--secondary', palette.secondary);
    root.style.setProperty('--accent', palette.accent);
  }, [palette]);

  return (
    <div className="app">
      <header className="header">
        <h1>
          Explore Your <span style={{ color: palette.primary }}>Palette</span>
        </h1>
        <p>Use the toolbar below to customize your colors.</p>
      </header>

      <ThemePreview palette={palette} />

      <PaletteGenerator palette={palette} setPalette={setPalette} />
    </div>
  );
}

export default App;
