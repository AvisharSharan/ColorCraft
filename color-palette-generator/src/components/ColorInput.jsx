import "../styles/ColorInput.css";

function ColorInput({ baseColor, setBaseColor }) {
  return (
    <div className="color-input">
      <label htmlFor="color">Base Color:</label>
      <input
        type="color"
        id="color"
        value={baseColor}
        onChange={(e) => setBaseColor(e.target.value)}
      />
      <span>{baseColor}</span>
    </div>
  );
}

export default ColorInput;
