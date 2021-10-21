import React, { useState } from 'react';
import { DustbinPinkIcon } from '../common/Icons';
import { t } from '../../global/transShim';

interface props {
  whatSelect: string;
}

const AccountsInput = (myProps: props) => {
  const { whatSelect } = myProps;
  const [DisableAccount, setDisableAccount] = useState<boolean>(false);

  console.log(DisableAccount, 'DisableAccount');
  return (
    <>
      <div className="position-relative">
        <div className="row">
          <div className={`${DisableAccount ? 'overlay-dsiable-account' : ''}`}></div>
          <div className="col-12">
            <div className="width-207">
              <label className="account-label-style" htmlFor="">
                {t('SourceConfigInputs.Alias')}
              </label>
              <input disabled={DisableAccount} className="account-input-style" type="text" placeholder="Dad Account" />
            </div>
          </div>
          <div className="col-12">
            <div className="d-flex">
              <div className="acc-input-parent">
                <label className="account-label-style" htmlFor="">
                  {whatSelect} {t('SourceConfigInputs.login')}
                </label>
                <input
                  disabled={DisableAccount}
                  className="amazonlogin-input-style"
                  type="text"
                  placeholder="dadaccount@gmail.com"
                />
              </div>
              <div className="width-207 ml-3 ml-sm-5">
                <label className="account-label-style" htmlFor="">
                  {whatSelect} {t('SourceConfigInputs.password')}
                </label>
                <input disabled={DisableAccount} className="account-input-style" type="text" placeholder="3456344" />
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="width-466">
              <label className="account-label-style" htmlFor="">
                {t('SourceConfigInputs.OTPCode2FA')}
                <span className="ml-2 obtain-code-otp"> {t('SourceConfigInputs.ObtainYourOTPCode')} </span>
              </label>
              <input
                disabled={DisableAccount}
                className="otp-code-input-styles"
                type="text"
                placeholder="JJSndfnfgurbgjD935h5gmSKFJASFNFNBGG"
              />
            </div>
          </div>

          <div className="col-12">
            <div className="width-207">
              <label className="account-label-style" htmlFor="">
                {t('SourceConfigInputs.PhoneNumber')}
              </label>
              <input
                disabled={DisableAccount}
                className="account-input-style"
                type="text"
                placeholder="(555) 555-5555"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 my-4 my-sm-5">
          <div className="d-flex">
            <div className="enable-disable-para mr-4">
              <p>{t('SourceConfigInputs.DisableAccount')}</p>
              <span>{t('SourceConfigInputs.DeactivateYourAccountMessage')} </span>
            </div>

            <div className="custom-control  d-flex align-items-center switchbox custom-switch ">
              <label className="switch-toggle mb-0 " htmlFor="checkbox-1">
                <input
                  className="input-toggle-switch"
                  onChange={() => setDisableAccount(!DisableAccount)}
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
            <DustbinPinkIcon /> <div className="ml-2"> {t('SourceConfigInputs.RemoveAccount')}</div>
          </p>
          <p className="dark-pink-para mt-3">{t('SourceConfigInputs.DeleteYourAccountMessage')}I</p>
        </div>
      </div>
    </>
  );
};

export default AccountsInput;
