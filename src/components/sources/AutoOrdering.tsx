import React, { useState, ChangeEvent } from 'react';
import { DispatchedOrderIcon } from '../common/Icons';
import AccountsInput from './AccountsInput';
// import Select from 'react-select';

const AutoOrdering = () => {
  const [checked, setChecked] = useState<boolean>(false);
  // FOR GET VALUE OF TOGGLE SWITCH

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setChecked(event.target.checked);
  };
  console.log(checked, 'state');

  // const options = [
  //   { value: 'Select supplier', label: 'Select supplier', isDisabled: true },
  //   { value: 'Amazon', label: 'Amazon' },
  //   { value: 'Flipcart', label: 'Flipcart' },
  //   { value: 'Ali Express', label: 'Ali Express' }
  // ];

  return (
    <>
      <div className="d-flex flex-column flex-lg-row justify-content-between mt-4 mt-lg-0">
        <div className="d-flex flex-column">
          <div className="d-flex my-0 my-lg-5">
            <div className="enable-disable-para ">
              <p>Enable/Disable Auto-ordering</p>
              <span>Disabling auto-ordering will require you to manually process new orders.</span>
            </div>

            <div className="custom-control  d-flex align-items-center switchbox custom-switch px-2">
              <label className="switch-toggle mb-0 " htmlFor="checkbox-2">
                <input className="input-toggle-switch" onChange={handleChange} type="checkbox" id="checkbox-2" />
                <div className="slider-toggle round"></div>
              </label>
            </div>
          </div>

          <h2 className="acc-config-text">
            Account configuration: <span> Dad account</span>{' '}
          </h2>

          {/* <div className="row my-2">
            <div className="col-7">
              <Select options={options} defaultValue={options[0]} />
            </div>
          </div> */}

          <AccountsInput />
        </div>
        <div className="d-flex flex-row flex-sm-column">
          <button className="btn save-changes-btn mb-0 mb-sm-3">
            <DispatchedOrderIcon />
            <span className="ml-2">Save changes</span>
          </button>
          <button className="ml-3 ml-sm-0 btn reset-to-default-btn">Reset to default</button>
        </div>
      </div>
    </>
  );
};

export default AutoOrdering;
