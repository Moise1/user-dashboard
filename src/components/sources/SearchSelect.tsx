import React, { useState } from 'react';
import dropicon from '../../assets/dropicon.svg';
import search_icon from '../../assets/search.svg';

const SearchSelect = () => {
  const arrayLists = [
    { value: 'Amazon', id: 101 },
    { value: 'Others', id: 102 },
    { value: 'Ali Expreess', id: 103 },
    { value: 'First', id: 104 },
    { value: 'Second', id: 105 },
    { value: 'Costo', id: 105 },
    { value: 'Nikola', id: 105 },
    { value: 'Tesla', id: 105 },
    { value: 'Amaozoamsd', id: 105 },
    { value: 'Third', id: 106 }
  ];

  const [showDropDown, setShowDropDown] = useState<boolean>();
  const [whatSelect, setWhatSelect] = useState<string>('Select Supplier');

  const handleSelectValue = (value: string) => {
    setWhatSelect(value);
    setShowDropDown(false);
  };
  return (
    <>
      <div className="react-search-with-select-parent">
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

export default SearchSelect;
