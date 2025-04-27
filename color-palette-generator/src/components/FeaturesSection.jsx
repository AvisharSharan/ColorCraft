import React from "react";

const FeaturesSection = ({ onExportClick }) => (
  <div className="features-container" style={{ width: "50%", padding: "1rem" }}>
    <button 
      className="export-btn" 
      onClick={onExportClick}
    >Save
      <span className="material-icons">save</span>
    </button>
  </div>
);

export default FeaturesSection;