import React, { useState } from 'react';
import dropicon from '../../assets/dropicon.svg';
import search_icon from '../../assets/search.svg';
import { PersonWithPlusIcon } from '../common/Icons';
import { Popover } from 'antd';
import { t } from '../../global/transShim';

interface props {
  DisableAccount: boolean;
  whichAccountSelect: string;
  setwhichAccountSelect: (arg0: string) => void;
  setAlias: (arg0: string) => void;
  setPassword: (arg0: number) => void;
  setOtp: (arg0: string) => void;
  setphone: (arg0: string) => void;
}

const AddAccountsSelect = (myProps: props) => {
  const { setAlias, setOtp, setPassword, setphone, DisableAccount, whichAccountSelect, setwhichAccountSelect } =
    myProps;

  // ACCOUNT LISTS ARRAY
  const accountArray = [
    {
      id: 101,
      email: 'account222@gmail.com',
      alias: 'Dad Account',
      AWDSLogin: 'something',
      AWDSPassword: 232132,
      OTPCode: 'JJSndfnfgurbgjD935h5gmSKFJASFNFNBGG',
      phoneNumber: '(555) 555-5555',
      isDisabled: true
    },
    {
      id: 102,
      email: 'fasdf@gmail.com',
      alias: 'Here we Go',
      AWDSLogin: 'something',
      AWDSPassword: 232132,
      OTPCode: 'JJSndfnfgurbgjD935h5gmSKFJASFNFNBGG',
      phoneNumber: '(124) 555-5555',
      isDisabled: false
    },
    {
      id: 101,
      email: 'account222@gmail.com',
      alias: 'Dad Account',
      AWDSLogin: 'something',
      AWDSPassword: 232132,
      OTPCode: 'JJSndfnfgurbgjD935h5gmSKFJASFNFNBGG',
      phoneNumber: '(555) 555-5555',
      isDisabled: false
    }
  ];

  // STATE TO MANAGE SELECTION AND FILTERED
  const [showDropDown, setShowDropDown] = useState<boolean>();
  const [showAccountInput, setShowAccountInput] = useState<boolean>();
  const [isDisabledAccount, setDisabledAccount] = useState<boolean>();
  const [supplierData, setSupplierData] = useState(accountArray);
  const [inputSearchValue, setInputSearchValue] = useState<string>('');
  const [AddAccountValue, setAddAccountValue] = useState<string>('');

  // FOR HANDLE SELECT VALUE
  const handleSelectValue = (value: string) => {
    setwhichAccountSelect(value);
    setShowDropDown(false);
  };

  // FUNCTION TO FILTER ON INPUT SEARCH
  const handleSearch = (value: string) => {
    setInputSearchValue(inputSearchValue);
    const filteredSearch = accountArray.filter((obj) => obj.email.toLowerCase().includes(value.toLowerCase()));
    setSupplierData(filteredSearch);
  };

  // HANDLE NEW ACCOUNT ADDED
  const handleAccountPushToList = () => {
    setShowAccountInput(false);
    const id = Math.random() * 1023812031111;
    const newAccount = {
      id: id,
      email: AddAccountValue,
      alias: 'Dad Account',
      AWDSLogin: 'something',
      AWDSPassword: 232132123,
      OTPCode: 'JJSndfnfgurbgjD935h5gmSKFJASFNFNBGG',
      phoneNumber: '(555) 555-5555',
      isDisabled: false
    };
    supplierData.unshift(newAccount);
    console.log(accountArray, 'accountArray');
  };

  return (
    <>
      {showDropDown ? <div onClick={() => setShowDropDown(false)} className="overlay-select"></div> : ''}

      <div className="react-search-with-select-parent add-account-select-parent">
        <div className="select-dropdown-shows" onClick={() => setShowDropDown(!showDropDown)}>
          {/* IF ANY ACCOUNT DISABLED THEN SHOW POPOVER AND FADE THE TEXT  */}
          <h5 className={`${DisableAccount || isDisabledAccount ? 'disabled-account-text' : ''}`}>
            {DisableAccount || isDisabledAccount ? (
              <Popover
                placement="right"
                content={
                  <div className="pop-over-content">
                    <p className="mb-0"> {t('SourceConfigInputs.Disabled')}</p>
                  </div>
                }
              >
                {whichAccountSelect}
              </Popover>
            ) : (
              whichAccountSelect
            )}
          </h5>
          <span>
            <img src={dropicon} alt="dropicon" />
          </span>
        </div>

        {showDropDown ? (
          <div className="shows-search-drop-list">
            <div className="drop-list-search-input">
              <input
                onChange={(e) => handleSearch(e.target.value)}
                type="text"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                placeholder="Search..."
              />
              <span className="search-icon-input-box">
                <img src={search_icon} height="12" alt="search_icon" />
              </span>
            </div>

            {showAccountInput ? (
              <form className="add-account-input-inselect" onSubmit={handleAccountPushToList}>
                <input
                  type="text"
                  className="position-relative"
                  // onKeyPress={handleKeyPress}
                  onChange={(e) => setAddAccountValue(e.target.value)}
                />
                <span className="plus-icon-add" onClick={() => handleAccountPushToList()}>
                  <PersonWithPlusIcon />
                </span>
              </form>
            ) : (
              <div className="d-flex aling-items-center  mt-2" onClick={() => setShowAccountInput(true)}>
                <span className="add-acccounnt-span"> {t('SourceConfigInputs.AddAccount')}</span>
                <span className="ml-2 add-acccounnt-icon">
                  <PersonWithPlusIcon />
                </span>
              </div>
            )}

            <div className="react-list-data-here">
              {supplierData.map((list) => (
                <li
                  className={`${list.isDisabled ? 'disabled-btn' : ''}`}
                  key={list.id}
                  onClick={() => {
                    handleSelectValue(list.email);
                    setAlias(list.alias);
                    setphone(list.phoneNumber);
                    setOtp(list.OTPCode);
                    setPassword(list.AWDSPassword);
                    if (list.isDisabled) {
                      setDisabledAccount(true);
                    } else {
                      setDisabledAccount(false);
                    }
                  }}
                >
                  {list.isDisabled ? (
                    <Popover
                      placement="right"
                      content={
                        <div className="pop-over-content">
                          <p className="mb-0"> {t('SourceConfigInputs.Disabled')}</p>
                        </div>
                      }
                    >
                      {list.email}
                    </Popover>
                  ) : (
                    list.email
                  )}
                </li>
              ))}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default AddAccountsSelect;
