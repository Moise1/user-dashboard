import React, { useState } from 'react';
import AccountsInput from './AccountsInput';
import AddAccountsSelect from './AddAccountsSelect';
import { t } from '../../global/transShim';

interface props {
  whatSelect: string;
  checked: boolean;
}

const AccountsMangage = (myProps: props) => {
  const { whatSelect, checked } = myProps;
  const [DisableAccount, setDisableAccount] = useState<boolean>(false);
  const [whichAccountSelect, setwhichAccountSelect] = useState<string>('Select or add account');
  const [alias, setAlias] = useState<string>('Sheru');
  const [password, setPassword] = useState<number>(543634);
  const [otp, setOtp] = useState<string>('JJSndfnfgurbgjD935h5gmSKFJASFNF@#WEFSD');
  const [phone, setphone] = useState<string>('4442323423');

  return (
    <>
      {checked ? (
        <>
          <div className="d-flex flex-column flex-lg-row justify-content-between">
            <div className="d-flex flex-column mb-3 mb-lg-0">
              <h2 className="acc-config-text py-3">
                {t('SourceConfigInputs.AccountConfiguration')} : <span>{whichAccountSelect} </span>{' '}
              </h2>

              <AddAccountsSelect
                DisableAccount={DisableAccount}
                setDisableAccount={setDisableAccount}
                setwhichAccountSelect={setwhichAccountSelect}
                whichAccountSelect={whichAccountSelect}
                setAlias={setAlias}
                setPassword={setPassword}
                setOtp={setOtp}
                setphone={setphone}
              />

              {/* IF ANY ACCOUNT IS NOT SELECTED AND VALUE IS NOT DEFAULT VALUE THEN WE HAVE NOT TO SHOW INPUT OR TOGGLE ICON  */}
              {whichAccountSelect.length && whichAccountSelect !== 'Select or add account' ? (
                <AccountsInput
                  alias={alias}
                  otp={otp}
                  password={password}
                  phone={phone}
                  whatSelect={whatSelect}
                  DisableAccount={DisableAccount}
                  setDisableAccount={setDisableAccount}
                  whichAccountSelect={whichAccountSelect}
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default AccountsMangage;
