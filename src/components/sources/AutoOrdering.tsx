import React, { useState, ChangeEvent } from 'react';
import { DispatchedOrderIcon } from '../common/Icons';
import AccountsInput from './AccountsInput';
import AddAccountsSelect from './AddAccountsSelect';
import { t } from '../../global/transShim';

interface props {
  whatSelect: string;
}

const AutoOrdering = (myProps: props) => {
  const [checked, setChecked] = useState<boolean>(false);
  const { whatSelect } = myProps;

  // FOR GET VALUE OF TOGGLE SWITCH

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setChecked(event.target.checked);
  };

  console.log(checked, 'state');

  return (
    <>
      <div className="d-flex flex-column flex-lg-row justify-content-between mt-4 mt-lg-0">
        <div className="d-flex flex-column">
          <div className="d-flex my-0 my-lg-5 ">
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

          <h2 className="acc-config-text py-3">
            {t('SourceConfigInputs.AccountConfiguration')} : <span> {t('SourceConfigInputs.DadAccount')}</span>{' '}
          </h2>

          <AddAccountsSelect />

          <AccountsInput whatSelect={whatSelect} />
        </div>
        <div className="d-flex flex-row flex-sm-column">
          <button className="btn save-changes-btn mb-0 mb-sm-3">
            <DispatchedOrderIcon />
            <span className="ml-2">{t('SourceConfigInputs.SaveChanges')} </span>
          </button>
          <button className="ml-3 ml-sm-0 btn reset-to-default-btn"> {t('SourceConfigInputs.ResetToDefault')}</button>
        </div>
      </div>
    </>
  );
};

export default AutoOrdering;
