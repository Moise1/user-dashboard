import React, { ChangeEvent, useState } from 'react';
import AccountsMangage from './AccountsMangage';
import { t } from '../../global/transShim';

interface props {
  showOrdering: boolean;
  whatSelect: string;
  setWhatSelect: (arg0: string) => void;
  setShowOrdering: (arg0: boolean) => void;
}

const AutoOrdering = (myProps: props) => {
  const { showOrdering, whatSelect } = myProps;
  const [checked, setChecked] = useState<boolean>(false);

  // FOR GET VALUE OF TOGGLE SWITCH
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <div className="col">
        <div className={` ${showOrdering ? '' : 'h-100'} `}>
          <div className="d-flex flex-column flex-lg-row justify-content-between">
            <div className="d-flex">
              <div className="enable-disable-para ">
                <p>{t('SourceConfigInputs.EnableDisableAutoOrdering')}</p>
                <span className="mr-5">Disabling auto-ordering will require you to manually process new orders.</span>
              </div>

              <div className="custom-control  d-flex align-items-center switchbox custom-switch px-2">
                <label className="switch-toggle mb-0 " htmlFor="checkbox-2">
                  <input className="input-toggle-switch" onChange={handleChange} type="checkbox" id="checkbox-2" />
                  <div className="slider-toggle round"></div>
                </label>
              </div>
            </div>

            {/* <div className="supplier-dropdown">
            <SearchSelect whatSelect={whatSelect} setWhatSelect={setWhatSelect} setShowOrdering={setShowOrdering} />
          </div> */}
          </div>

          {showOrdering ? <AccountsMangage checked={checked} whatSelect={whatSelect} /> : ''}
        </div>
      </div>
    </>
  );
};

export default AutoOrdering;
