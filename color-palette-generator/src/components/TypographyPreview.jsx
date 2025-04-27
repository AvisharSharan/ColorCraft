import React from "react";

const TypographyPreview = ({ palette }) => (
  <div className="typography-preview">
    <h1 style={{ color: palette.text }}>Typography Preview</h1>
    <p style={{ color: palette.text }}>
      This is a paragraph example with clean and modern styling. Check out the
      <span style={{ marginLeft: "0.5rem" }}>
        <a href="#" style={{ color: palette.accent }}>accent color</a>
      </span>.
    </p>
  </div>
);

export default TypographyPreview;