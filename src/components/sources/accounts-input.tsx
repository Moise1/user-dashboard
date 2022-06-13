import { DustbinPinkIcon, HandFiveFingerIcon } from '../common/Icons';
import { t } from '../../utils/transShim';

interface props {
  alias: string;
  otp: string;
  password: number;
  phone: string;
  whatSelect: string;
  whichAccountSelect: string;
  DisableAccount: boolean;
  setDisableAccount: (arg0: boolean) => void;
}

const AccountsInput = (myProps: props) => {
  const { alias, otp, password, phone, whatSelect, DisableAccount, setDisableAccount, whichAccountSelect } = myProps;

  return (
    <>
      <div className="position-relative">
        <div className="row">
          <div className={`${DisableAccount ? 'overlay-dsiable-account' : ''}`}></div>
          <div className="col-12">
            <div>
              <label className="account-label-style" htmlFor="">
                {alias}
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
                <input disabled={DisableAccount} className="" type="text" placeholder={whichAccountSelect} />
              </div>
              <div className="ml-3 ml-sm-5">
                <label className="account-label-style" htmlFor="">
                  {whatSelect} {t('SourceConfigInputs.password')}
                </label>
                <input
                  disabled={DisableAccount}
                  className="account-input-style"
                  type="text"
                  placeholder={password.toString()}
                />
              </div>
            </div>
          </div>

          <div className="col-12">
            <div>
              <label className="account-label-style" htmlFor="">
                {t('SourceConfigInputs.OTPCode2FA')}
                <span className="ml-2 obtain-code-otp"> {t('SourceConfigInputs.ObtainYourOTPCode')} </span>
              </label>
              <input disabled={DisableAccount} className="otp-code-input-styles" type="text" placeholder={otp} />
            </div>
          </div>

          <div className="col-12">
            <div>
              <label className="account-label-style" htmlFor="">
                {t('SourceConfigInputs.PhoneNumber')}
              </label>
              <input disabled={DisableAccount} className="account-input-style" type="text" placeholder={phone} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 my-4 my-sm-5">
          <div className="d-flex">
            <div className="enable-disable-para mr-4">
              <p className={`${DisableAccount ? 'hand-disabled' : ''} d-flex`}>
                <p className="mr-2">{t('SourceConfigInputs.DisableAccount')}</p>
                <HandFiveFingerIcon />
              </p>
              <span>{t('SourceConfigInputs.DeactivateYourAccountMessage')} </span>
            </div>

            <div className="d-flex align-items-center switchbox custom-switch ">
              <label className="switch-toggle mb-0 " htmlFor="checkbox-1">
                <input
                  className="input-toggle-switch"
                  onChange={() => {
                    if (whatSelect.length) {
                      setDisableAccount(!DisableAccount);
                    }
                  }}
                  checked={DisableAccount}
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
