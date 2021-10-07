import React from 'react';
import { DustbinPinkIcon } from '../common/Icons';

const AccountsInput = () => {
  return (
    <>
      <div className="row">
        <div className="col-6">
          <label className="account-label-style" htmlFor="">
            Alias
          </label>
          <input className="account-input-style" type="text" placeholder="Dad Account" />
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-3">
              <label className="account-label-style" htmlFor="">
                Amazon login
              </label>
              <input className="account-input-style" type="text" placeholder="Dad Account" />
            </div>
            <div className="col">
              <label className="account-label-style" htmlFor="">
                Amazon password
              </label>
              <input className="account-input-style" type="text" placeholder="Dad Account" />
            </div>
          </div>
        </div>
        <div className="col-12">
          <label className="account-label-style" htmlFor="">
            OTP code(2FA) <span>Obtain your OTP code </span>
          </label>
          <input className="account-input-style" type="text" placeholder="Dad Account" />
        </div>
        <div className="col-12">
          <label className="account-label-style" htmlFor="">
            Phone number
          </label>
          <input className="account-input-style" type="text" placeholder="Dad Account" />
        </div>
        <div className="col-12">
          <div className="d-flex">
            <div className="enable-disable-para ">
              <p>Enable/Disable Auto-ordering</p>
              <span>Disabling auto-ordering will require you to manually process new orders.</span>
            </div>

            <span>Toggle button</span>
          </div>
        </div>
        <div className="col-12">
          <p>
            {' '}
            <DustbinPinkIcon /> Remove account
          </p>
          <p>
            If you delete this account, you will have to set it up again and no payments will be made through this
            account.
          </p>
        </div>
      </div>
    </>
  );
};

export default AccountsInput;
