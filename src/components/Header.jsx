import React from "react";
import "../styles/Header.css";
import chroma from "chroma-js";

const Header = ({ palette = {} }) => {
  
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-container">
          <img src="/ColorCraftLogo.svg" alt="ColorCraft Logo" className="logo" />
          <h1 className="app-title">ColorCraft</h1>
        </div>
        
        <div className="header-actions">
          <div className="header-badge" 
            style={{ 
              background: palette.primary ? `linear-gradient(90deg, ${palette.secondary || '#7c3aed'}, ${palette.primary || '#3a87ed'})` : undefined,
              color: "#fff"
            }}>
            <span className="badge-text">Color Palette Generator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;