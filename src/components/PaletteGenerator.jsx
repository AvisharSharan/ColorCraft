import { useState } from "react";
import chroma from "chroma-js";

const PaletteGenerator = () => {
  const generatePalette = (harmonyMode, baseColor, useBaseColor) => {
    try {
      const base = useBaseColor ? chroma(baseColor) : chroma.random();
      let newPalette = {};

      switch (harmonyMode) {
        case "monochromatic":
          newPalette = generateMonochromaticPalette(base);
          break;
        case "complementary":
          newPalette = generateComplementaryPalette(base);
          break;
        case "triadic":
          newPalette = generateTriadicPalette(base);
          break;
        case "split-complementary":
          newPalette = generateSplitComplementaryPalette(base);
          break;
        case "tetradic":
          newPalette = generateTetradicPalette(base);
          break;
        case "analogous":
        default:
          newPalette = generateAnalogousPalette(base);
      }

      return newPalette;
    } catch (error) {
      console.error("Error generating palette:", error);
      return generateFallbackPalette();
    }
  };

  const generateAnalogousPalette = (base) => {
    return {
      primary: base.hex(),
      secondary: base.set('hsl.h', (base.get('hsl.h') + 30) % 360).hex(),
      accent: base.set('hsl.h', (base.get('hsl.h') + 60) % 360).hex(),
      background: base.set('hsl.l', Math.min(0.95, base.get('hsl.l') + 0.3)).hex(),
      text: base.set('hsl.l', Math.max(0.15, base.get('hsl.l') - 0.3)).hex()
    };
  };

  const generateMonochromaticPalette = (base) => {
    return {
      primary: base.hex(),
      secondary: base.set('hsl.s', base.get('hsl.s') * 0.7).hex(),
      accent: base.set('hsl.l', base.get('hsl.l') * 0.7).hex(),
      background: base.set('hsl.l', Math.min(0.95, base.get('hsl.l') + 0.3)).hex(),
      text: base.set('hsl.l', Math.max(0.15, base.get('hsl.l') - 0.3)).hex()
    };
  };

  const generateComplementaryPalette = (base) => {
    return {
      primary: base.hex(),
      secondary: base.set('hsl.h', (base.get('hsl.h') + 180) % 360).hex(),
      accent: base.set('hsl.s', base.get('hsl.s') * 0.8)
                 .set('hsl.l', base.get('hsl.l') * 0.8).hex(),
      background: base.set('hsl.l', Math.min(0.95, base.get('hsl.l') + 0.3)).hex(),
      text: base.set('hsl.l', Math.max(0.15, base.get('hsl.l') - 0.3)).hex()
    };
  };

  const generateTriadicPalette = (base) => {
    return {
      primary: base.hex(),
      secondary: base.set('hsl.h', (base.get('hsl.h') + 120) % 360).hex(),
      accent: base.set('hsl.h', (base.get('hsl.h') + 240) % 360).hex(),
      background: base.set('hsl.l', Math.min(0.95, base.get('hsl.l') + 0.3)).hex(),
      text: base.set('hsl.l', Math.max(0.15, base.get('hsl.l') - 0.3)).hex()
    };
  };

  const generateSplitComplementaryPalette = (base) => {
    return {
      primary: base.hex(),
      secondary: base.set('hsl.h', (base.get('hsl.h') + 150) % 360).hex(),
      accent: base.set('hsl.h', (base.get('hsl.h') + 210) % 360).hex(),
      background: base.set('hsl.l', Math.min(0.95, base.get('hsl.l') + 0.3)).hex(),
      text: base.set('hsl.l', Math.max(0.15, base.get('hsl.l') - 0.3)).hex()
    };
  };

  const generateTetradicPalette = (base) => {
    return {
      primary: base.hex(),
      secondary: base.set('hsl.h', (base.get('hsl.h') + 90) % 360).hex(),
      accent: base.set('hsl.h', (base.get('hsl.h') + 180) % 360).hex(),
      background: base.set('hsl.l', Math.min(0.95, base.get('hsl.l') + 0.3)).hex(),
      text: base.set('hsl.h', (base.get('hsl.h') + 270) % 360)
              .set('hsl.l', Math.max(0.15, base.get('hsl.l') - 0.3)).hex()
    };
  };

  const generateFallbackPalette = () => {
    const randomBase = chroma.random();
    return {
      primary: randomBase.hex(),
      secondary: randomBase.set('hsl.h', (randomBase.get('hsl.h') + 30) % 360).hex(),
      accent: randomBase.set('hsl.h', (randomBase.get('hsl.h') + 60) % 360).hex(),
      background: randomBase.set('hsl.l', Math.min(0.95, randomBase.get('hsl.l') + 0.3)).hex(),
      text: randomBase.set('hsl.l', Math.max(0.15, randomBase.get('hsl.l') - 0.3)).hex()
    };
  };

  return { generatePalette };
};

export default PaletteGenerator;