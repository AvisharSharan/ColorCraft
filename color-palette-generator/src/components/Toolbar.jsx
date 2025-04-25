import React from 'react';
import '../styles/Toolbar.css';

const Toolbar = ({ onGenerate, palette }) => {
  return (
    <div className="toolbar">
      <button 
        className="generate-btn"
        style={{ 
          background: `linear-gradient(90deg, ${palette.primary}, ${palette.secondary})`, 
          color: palette.background 
        }}
        onClick={onGenerate}
      >
        Generate Palette
      </button>
    </div>
  );
};

export default Toolbar;