const ButtonPreview = ({ palette }) => (
  <div className="button-preview">
    <button 
      style={{ 
        width: "190px",
        fontWeight: "bold",
        backgroundColor: palette.primary,  
      }} 
      className="primary-btn"
    >
      Primary Button
    </button>
    <button 
      style={{ 
        width: "190px",
        fontWeight: "bold",
        backgroundColor: palette.secondary, 
      }} 
      className="secondary-btn"
    >
      Secondary Button
    </button>
  </div>
);

export default ButtonPreview;