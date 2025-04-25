import React from 'react';
import '../styles/Toolbar.css';

const Toolbar = ({ onGenerate }) => {
  return (
    <div className="toolbar">
      <button className="generate-btn" onClick={onGenerate}>
        Generate Palette
      </button>
    </div>
  );
};

export default Toolbar;