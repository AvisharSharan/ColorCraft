import "../styles/ThemePreview.css";

function ThemePreview({ palette }) {
  return (
    <div className="theme-preview">
      <div className="text-block">
        <h2>This is heading text</h2>
        <p>This paragraph uses the text and background colors.</p>
      </div>

      <button className="primary-btn">Primary Button</button>
      <button className="secondary-btn">Secondary Button</button>

      <div className="card">
        <h4>Card Title</h4>
        <p>This card uses the secondary color for background.</p>
      </div>

      <span className="accent-badge">#Accent Highlight</span>
    </div>
  );
}

export default ThemePreview;
