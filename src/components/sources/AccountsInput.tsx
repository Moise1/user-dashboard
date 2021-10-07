import React from 'react';
import { DustbinPinkIcon } from '../common/Icons';

const AccountsInput = () => {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="width-207">
            <label className="account-label-style" htmlFor="">
              Alias
            </label>
            <input className="account-input-style" type="text" placeholder="Dad Account" />
          </div>
        </div>
        <div className="col-12">
          <div className="d-flex flex-column flex-sm-row">
            <div className="acc-input-parent">
              <label className="account-label-style" htmlFor="">
                Amazon login
              </label>
              <input className="amazonlogin-input-style" type="text" placeholder="dadaccount@gmail.com" />
            </div>
            <div className="width-207 ml-0 ml-sm-5">
              <label className="account-label-style" htmlFor="">
                Amazon password
              </label>
              <input className="account-input-style" type="text" placeholder="3456344" />
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="width-466">
            <label className="account-label-style" htmlFor="">
              OTP code(2FA) <span className="ml-2 obtain-code-otp">Obtain your OTP code </span>
            </label>
            <input className="otp-code-input-styles" type="text" placeholder="JJSndfnfgurbgjD935h5gmSKFJASFNFNBGG" />
          </div>
        </div>

        <div className="col-12">
          <div className="width-207">
            <label className="account-label-style" htmlFor="">
              Phone number
            </label>
            <input className="account-input-style" type="text" placeholder="(555) 555-5555" />
          </div>
        </div>
        <div className="col-12 my-5">
          <div className="d-flex">
            <div className="enable-disable-para ">
              <p>Enable/Disable Auto-ordering</p>
              <span>Disabling auto-ordering will require you to manually process new orders.</span>
            </div>

            <div className="custom-control  d-flex align-items-center switchbox custom-switch ">
              <label className="switch-toggle mb-0 " htmlFor="checkbox-1">
                <input
                  className="input-toggle-switch"
                  // onChange={handleActive}
                  // checked={status === undefined ? false : status}
                  // checked={isActive}
                  type="checkbox"
                  id="checkbox-1"
                />
                <div className="slider-toggle round"></div>
              </label>
            </div>
          </div>
        </div>
        <div className="col-12">
          <p className="remove-account-div">
            {' '}
            <DustbinPinkIcon /> <div className="ml-2">Remove account</div>
          </p>
          <p className="dark-pink-para mt-3">
            If you delete this account, you will have to set it up again and no payments will be made through this
            account.
          </p>
        </div>
      </div>
    </>
  );
};

export default AccountsInput;
