import React, { useState } from 'react';
import dropicon from '../../assets/dropicon.svg';
import search_icon from '../../assets/search.svg';
import { PersonWithPlusIcon } from '../common/Icons';

const AddAccountsSelect = () => {
  const arrayLists = [
    { value: 'account222@gmail.com', id: 101 },
    { value: 'account222@gmail.com', id: 102 },
    { value: 'account222@gmail.com', id: 103 },
    { value: 'account222@gmail.com', id: 104 },
    { value: 'account222@gmail.com', id: 105 },
    { value: 'account222@gmail.com', id: 106 },
    { value: 'account222@gmail.com', id: 107 },
    { value: 'account222@gmail.com', id: 108 },
    { value: 'account222@gmail.com', id: 109 },
    { value: 'Thiraccount222@gmail.com', id: 110 }
  ];

  const [showDropDown, setShowDropDown] = useState<boolean>();
  const [whatSelect, setWhatSelect] = useState<string>('Select Supplier');

  const handleSelectValue = (value: string) => {
    setWhatSelect(value);
    setShowDropDown(false);
    // if (whatSelect !== 'Select Supplier') {
    //   setShowOrdering(true);
    // }
  };
  return (
    <>
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
              <input type="text" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." />
              <span className="search-icon-input-box">
                <img src={search_icon} height="12" alt="search_icon" />
              </span>
            </div>

            <div className="d-flex aling-items-center  mt-2">
              <span className="add-acccounnt-span"> Add account</span>
              <span className="ml-2">
                <PersonWithPlusIcon />
              </span>
            </div>

            <div className="react-list-data-here">
              {arrayLists.map((list) => (
                <li key={list.id} onClick={() => handleSelectValue(list.value)}>
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
