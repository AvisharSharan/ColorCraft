import chroma from "chroma-js";
import "../styles/PaletteGenerator.css";

function PaletteGenerator({ palette, setPalette }) {
  const generatePalette = () => {
    const base = chroma.random().saturate(2).brighten(1);
    const baseHue = base.get('hsl.h');
    const baseSat = base.get('hsl.s');
    const baseLum = base.get('hsl.l');

    const background = base.set('hsl.s', 0.2).brighten(2).hex();

    const text = chroma(background).luminance() > 0.5 ? "#000000" : "#ffffff";

    const primary = base.hex();
    const secondary = chroma.hsl(baseHue + 20, baseSat * 0.9, baseLum).hex();
    const accent = chroma.hsl((baseHue + 180) % 360, Math.min(baseSat + 0.3, 1), baseLum).hex();

    setPalette({
      text,
      background,
      primary,
      secondary,
      accent
    });
  };

  return (
    <div className="toolbar">
      {Object.entries(palette).map(([key, value]) => (
        <div key={key} className="toolbar-swatch" style={{ backgroundColor: value }}>
          <span style={{ color: key === "text" ? "#000000" : "#ffffff" }}>{key}</span>
        </div>
      ))}
      <button className="generate-btn" onClick={generatePalette}>
        🎲 Generate
      </button>
    </div>
  );
}

export default PaletteGenerator;
