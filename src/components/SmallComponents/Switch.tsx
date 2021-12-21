import React from 'react';
import { ChangeEvent, useState } from 'react';
import '../../sass/light-theme/small-components/switch.scss';

/*
interface props {
  showOrdering: boolean;
  whatSelect: string;
  setWhatSelect: (arg0: string) => void;
  setShowOrdering: (arg0: boolean) => void;
}

const Switch = (myProps: props) => {
  const [checked, setChecked] = useState<boolean>(false);

  // FOR GET VALUE OF TOGGLE SWITCH
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setChecked(event.target.checked);
  };
*/
function Switch() {
  return (
    <div className="custom-control d-flex align-items-center px-2">
      <label className="switch-toggle mb-0 " htmlFor="checkbox-2">
        <input className="input-toggle-switch" /*onChange={handleChange}*/ type="checkbox" id="checkbox-2" />
        <div className="slider-toggle round"></div>
      </label>
    </div>
  );
}

export default Switch;
