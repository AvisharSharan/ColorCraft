import React from "react";
import "../styles/Footer.css";
import chroma from "chroma-js";

const Footer = ({palette}) => {
  const textColor = palette.primary && chroma.contrast(palette.primary, '#ffffff') > 2.5 ? '#ffffff' : '#333333';
  
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-info">
          <div className="copyright">
            <span className="brand-name">ColorCraft</span> &copy; {new Date().getFullYear()}
          </div>
          <div className="creator">
            Handcrafted by <span className="creator-name">Avishar</span><span className="lightning">⚡</span>
          </div>
        </div>
        
        <div className="footer-links">
          <a href="https://github.com/AvisharSharan/ColorCraft" className="footer-link" title="View Source Code">
            <span className="material-icons">code</span>
            <span className="link-text">Source</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;