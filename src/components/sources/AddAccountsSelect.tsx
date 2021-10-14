import React, { useState } from 'react';
import dropicon from '../../assets/dropicon.svg';
import search_icon from '../../assets/search.svg';
import { PersonWithPlusIcon } from '../common/Icons';

const AddAccountsSelect = () => {
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

  const [showDropDown, setShowDropDown] = useState<boolean>();
  const [showAccountInput, setShowAccountInput] = useState<boolean>();
  const [whatSelect, setWhatSelect] = useState<string>('Select Supplier');
  const [supplierData, setSupplierData] = useState(arrayLists);
  const [inputSearchValue, setInputSearchValue] = useState<string>('');
  const [AddAccountValue, setAddAccountValue] = useState<string>('');

  const handleSelectValue = (value: string) => {
    setWhatSelect(value);
    setShowDropDown(false);
  };

  const handleSearch = (value: string) => {
    setInputSearchValue(inputSearchValue);
    const filteredSearch = arrayLists.filter((obj) => obj.value.toLowerCase().includes(value.toLowerCase()));
    setSupplierData(filteredSearch);
  };

  const handleAccountPushToList = () => {
    setShowAccountInput(false);
    const id = Math.random() * 1023812031111;

    const newAccount = { value: AddAccountValue, id: id, status: 'active' };
    console.log(newAccount, 'newAccount');
    supplierData.unshift(newAccount);
    // supplierData.splice(0, 0, newAccount);
    console.log(arrayLists, 'arrayLists');
  };

  console.log(AddAccountValue);

  return (
    <>
      {showDropDown ? <div onClick={() => setShowDropDown(false)} className="overlay-select"></div> : ''}

      <div className="react-search-with-select-parent w-348_54">
        <div className="select-dropdown-shows" onClick={() => setShowDropDown(!showDropDown)}>
          <h5>{whatSelect}</h5>
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
              <div className="add-account-input-inselect">
                <input type="text" className="position-relative" onChange={(e) => setAddAccountValue(e.target.value)} />
                <span className="plus-icon-add" onClick={() => handleAccountPushToList()}>
                  <PersonWithPlusIcon />
                </span>
              </div>
            ) : (
              <div className="d-flex aling-items-center  mt-2" onClick={() => setShowAccountInput(true)}>
                <span className="add-acccounnt-span"> Add account</span>
                <span className="ml-2">
                  <PersonWithPlusIcon />
                </span>
              </div>
            )}

            <div className="react-list-data-here">
              {supplierData.map((list) => (
                <li
                  className={`${list.status === 'disabled' ? 'disabled-btn' : ''}`}
                  key={list.id}
                  onClick={() => handleSelectValue(list.value)}
                >
                  {list.value}
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
