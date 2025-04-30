import React from "react";
import "../styles/Footer.css";
import chroma from "chroma-js";

const Footer = ({palette}) => (
  <footer className="app-footer">
    <p style={{color: chroma.contrast(palette.primary, '#ffffff') > 2.5 ? '#ffffff' : palette.text}}>
        Handcrafted by Avishar⚡
    </p>
  </footer>
);

export default Footer;