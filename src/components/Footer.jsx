import React from "react";
import "../styles/Footer.css";

const Footer = ({ palette = {} }) => {
    const handleSourceCodeClick = () => {
        window.open("https://github.com/AvisharSharan/ColorCraft");
    };
    
    return (
        <footer className="app-footer">
            <div className="footer-content">
                <div className="footer-signature">
                    <span className="material-icons">bolt</span>
                    <p>Handcrafted by Avishar Sharan</p>
                </div>
                
                <button 
                    className="source-code-btn"
                    onClick={handleSourceCodeClick}
                    style={{
                        background: palette.primary ? `linear-gradient(90deg, ${palette.secondary || '#7c3aed'}, ${palette.primary || '#3a87ed'})` : undefined
                    }}
                >
                    <span className="material-icons">code</span>
                    Source Code
                </button>
            </div>
        </footer>
    );
};

export default Footer;