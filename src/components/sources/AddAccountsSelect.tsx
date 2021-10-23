import React, { useState } from 'react';
import dropicon from '../../assets/dropicon.svg';
import search_icon from '../../assets/search.svg';
import { PersonWithPlusIcon } from '../common/Icons';
import { Popover } from 'antd';
import { t } from '../../global/transShim';

const AddAccountsSelect = () => {
  // ACCOUNT LISTS ARRAY
  const arrayLists = [
    { value: 'account222@gmail.com', id: 101, status: 'active' },
    { value: 'hello@gmail.com', id: 102, status: 'active' },
    { value: 'srk@gmail.com', id: 103, status: 'active' },
    { value: 'joanaount222@gmail.com', id: 104, status: 'active' },
    { value: 'whatsapp222@gmail.com', id: 105, status: 'active' },
    { value: 'good@gmail.com', id: 106, status: 'active' },
    { value: 'account222@gmail.com', id: 107, status: 'active' },
    { value: 'div@gmail.com', id: 108, status: 'active' },
    { value: 'span@gmail.com', id: 109, status: 'active' },
    { value: 'Jenny Amazon account', id: 110, status: 'disabled' }
  ];

  // STATE TO MANAGE SELECTION AND FILTERED
  const [showDropDown, setShowDropDown] = useState<boolean>();
  const [showAccountInput, setShowAccountInput] = useState<boolean>();
  const [isDisabledAccount, setDisabledAccount] = useState<boolean>();
  const [whatSelect, setWhatSelect] = useState<string>('Select or add account');
  const [supplierData, setSupplierData] = useState(arrayLists);
  const [inputSearchValue, setInputSearchValue] = useState<string>('');
  const [AddAccountValue, setAddAccountValue] = useState<string>('');

  // FOR HANDLE SELECT VALUE
  const handleSelectValue = (value: string) => {
    setWhatSelect(value);
    setShowDropDown(false);
  };

  // FUNCTION TO FILTER ON INPUT SEARCH
  const handleSearch = (value: string) => {
    setInputSearchValue(inputSearchValue);
    const filteredSearch = arrayLists.filter((obj) => obj.value.toLowerCase().includes(value.toLowerCase()));
    setSupplierData(filteredSearch);
  };

  // HANDLE NEW ACCOUNT ADDED
  const handleAccountPushToList = () => {
    setShowAccountInput(false);
    const id = Math.random() * 1023812031111;
    const newAccount = { value: AddAccountValue, id: id, status: 'active' };
    supplierData.unshift(newAccount);
    console.log(AddAccountValue);
    console.log(arrayLists, 'arrayLists');
  };

  // const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
  //   // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
  //   console.log('run key');
  //   if (event.key === 'Enter') {
  //     // event.preventDefault();
  //     // event.stopPropagation();
  //     handleAccountPushToList();
  //   }
  // };

  // const handleKeyPress = (event: ChangeEvent<HTMLInputElement>): void => {
  //   if (event) {
  //     handleAccountPushToList();
  //   }
  // };
  // const handleKeyPress = () => {
  //   handleAccountPushToList();
  // };
  return (
    <>
      {showDropDown ? <div onClick={() => setShowDropDown(false)} className="overlay-select"></div> : ''}

      <div className="react-search-with-select-parent add-account-select-parent">
        <div className="select-dropdown-shows" onClick={() => setShowDropDown(!showDropDown)}>
          {/* IF ANY ACCOUNT DISABLED THEN SHOW POPOVER AND FADE THE TEXT  */}
          <h5 className={`${isDisabledAccount ? 'disabled-account-text' : ''}`}>
            {isDisabledAccount ? (
              <Popover
                placement="right"
                content={
                  <div className="pop-over-content">
                    <p className="mb-0"> {t('SourceConfigInputs.Disabled')}</p>
                  </div>
                }
              >
                {whatSelect}
              </Popover>
            ) : (
              whatSelect
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
                  className={`${list.status === 'disabled' ? 'disabled-btn' : ''}`}
                  key={list.id}
                  onClick={() => {
                    handleSelectValue(list.value);
                    if (list.status === 'disabled') {
                      setDisabledAccount(true);
                    } else {
                      setDisabledAccount(false);
                    }
                  }}
                >
                  {list.status === 'disabled' ? (
                    <Popover
                      placement="right"
                      content={
                        <div className="pop-over-content">
                          <p className="mb-0"> {t('SourceConfigInputs.Disabled')}</p>
                        </div>
                      }
                    >
                      {list.value}
                    </Popover>
                  ) : (
                    list.value
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
