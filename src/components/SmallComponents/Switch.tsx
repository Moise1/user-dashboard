import '../../sass/light-theme/switch.scss';

 export const Switch = () => {
  return (
    <div className="switch-container">
      <label className="switch-toggle" htmlFor="checkbox-2">
        <input className="input-toggle-switch" /*onChange={handleChange}*/ type="checkbox" id="checkbox-2" />
        <div className="slider-toggle round"></div>
      </label>
    </div>
  );
}

