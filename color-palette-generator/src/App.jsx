import React from "react";
import Toolbar from "./components/Toolbar";
import PaletteGenerator from "./components/PaletteGenerator";
import PaletteHistory from "./components/PaletteHistory";
import ThemePreview from "./components/ThemePreview";
import "./styles/App.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>ColorCraft</h1>
        <p>Design stunning color palettes with ease.</p>
      </header>

      <main className="app-main">
        <div className="left-column">
          <PaletteGenerator />
          <PaletteHistory />
        </div>

        <div className="right-column">
          <ThemePreview />
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2025 ColorCraft. All rights reserved.</p>
      </footer>

      <Toolbar />
    </div>
  );
}

export default App;
