import { useState } from "react";
import chroma from "chroma-js";

const PaletteGenerator = () => {
  const generateLightBackground = (base) => {
    const minLightness = 0.95;
    let bgColor = base.set('hsl.s', base.get('hsl.s') * 0.5);
    const currentLightness = bgColor.get('hsl.l');
    if (currentLightness < minLightness) {
      bgColor = bgColor.set('hsl.l', minLightness);
    }
    return bgColor.hex();
  };

  const ensureVibrancyAndBrightness = (color) => {
    const minLightness = 0.5;
    const maxLightness = 0.95;
    const minSaturation = 0.5;
    let adjustedColor = color;
    if (adjustedColor.get('hsl.l') < minLightness) {
      adjustedColor = adjustedColor.set('hsl.l', minLightness);
    }
    if (adjustedColor.get('hsl.l') > maxLightness) {
      adjustedColor = adjustedColor.set('hsl.l', maxLightness);
    }
    if (adjustedColor.get('hsl.s') < minSaturation) {
      adjustedColor = adjustedColor.set('hsl.s', minSaturation);
    }
    return adjustedColor;
  };

  const generatePalette = (harmonyMode, baseColor, useBaseColor) => {
    try {
      let base;
      if (useBaseColor) {
        base = chroma(baseColor);
      } else {
        base = chroma.random();
      }
      base = ensureVibrancyAndBrightness(base);

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
      background: generateLightBackground(base),
      text: base.set('hsl.l', Math.max(0.15, base.get('hsl.l') - 0.3)).hex()
    };
  };

  const generateMonochromaticPalette = (base) => {
    return {
      primary: base.hex(),
      secondary: base.set('hsl.s', base.get('hsl.s') * 0.7).hex(),
      accent: base.set('hsl.l', base.get('hsl.l') * 0.7).hex(),
      background: generateLightBackground(base),
      text: base.set('hsl.l', Math.max(0.15, base.get('hsl.l') - 0.3)).hex()
    };
  };

  const generateComplementaryPalette = (base) => {
    return {
      primary: base.hex(),
      secondary: base.set('hsl.h', (base.get('hsl.h') + 180) % 360).hex(),
      accent: base.set('hsl.s', base.get('hsl.s') * 0.8)
                 .set('hsl.l', base.get('hsl.l') * 0.8).hex(),
      background: generateLightBackground(base),
      text: base.set('hsl.l', Math.max(0.15, base.get('hsl.l') - 0.3)).hex()
    };
  };

  const generateTriadicPalette = (base) => {
    return {
      primary: base.hex(),
      secondary: base.set('hsl.h', (base.get('hsl.h') + 120) % 360).hex(),
      accent: base.set('hsl.h', (base.get('hsl.h') + 240) % 360).hex(),
      background: generateLightBackground(base),
      text: base.set('hsl.l', Math.max(0.15, base.get('hsl.l') - 0.3)).hex()
    };
  };

  const generateSplitComplementaryPalette = (base) => {
    return {
      primary: base.hex(),
      secondary: base.set('hsl.h', (base.get('hsl.h') + 150) % 360).hex(),
      accent: base.set('hsl.h', (base.get('hsl.h') + 210) % 360).hex(),
      background: generateLightBackground(base),
      text: base.set('hsl.l', Math.max(0.15, base.get('hsl.l') - 0.3)).hex()
    };
  };

  const generateTetradicPalette = (base) => {
    return {
      primary: base.hex(),
      secondary: base.set('hsl.h', (base.get('hsl.h') + 90) % 360).hex(),
      accent: base.set('hsl.h', (base.get('hsl.h') + 180) % 360).hex(),
      background: generateLightBackground(base),
      text: base.set('hsl.h', (base.get('hsl.h') + 270) % 360)
              .set('hsl.l', Math.max(0.15, base.get('hsl.l') - 0.3)).hex()
    };
  };

  const generateFallbackPalette = () => {
    const randomBase = chroma.random();
    const adjustedBase = ensureVibrancyAndBrightness(randomBase);
    return {
      primary: adjustedBase.hex(),
      secondary: adjustedBase.set('hsl.h', (adjustedBase.get('hsl.h') + 30) % 360).hex(),
      accent: adjustedBase.set('hsl.h', (adjustedBase.get('hsl.h') + 60) % 360).hex(),
      background: generateLightBackground(adjustedBase),
      text: adjustedBase.set('hsl.l', Math.max(0.15, adjustedBase.get('hsl.l') - 0.3)).hex()
    };
  };

  return { generatePalette };
};

export default PaletteGenerator;
