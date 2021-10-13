import React, { useState } from 'react';
import dropicon from '../../assets/dropicon.svg';
import search_icon from '../../assets/search.svg';

interface props {
  setShowOrdering: (arg0: boolean) => void;
}

const SearchSelect = (myProps: props) => {
  const { setShowOrdering } = myProps;

  const arrayLists = [
    { value: 'Amazon', id: 101 },
    { value: 'Others', id: 102 },
    { value: 'Ali Expreess', id: 103 },
    { value: 'First', id: 104 },
    { value: 'Second', id: 105 },
    { value: 'Costo', id: 106 },
    { value: 'Nikola', id: 107 },
    { value: 'Tesla', id: 108 },
    { value: 'Amaozoamsd', id: 109 },
    { value: 'Third', id: 110 }
  ];

  const [showDropDown, setShowDropDown] = useState<boolean>();
  const [supplierData, setSupplierData] = useState(arrayLists);
  const [whatSelect, setWhatSelect] = useState<string>('Select Supplier');
  const [inputSearchValue, setInputSearchValue] = useState<string>('');

  const handleSelectValue = (value: string) => {
    setWhatSelect(value);
    setShowDropDown(false);
    setShowOrdering(true);
  };

  const handleSearch = (value: string) => {
    setInputSearchValue(inputSearchValue);
    const filteredSearch = arrayLists.filter((obj) => obj.value.toLowerCase().includes(value.toLowerCase()));
    setSupplierData(filteredSearch);
  };

  return (
    <>
      {showDropDown ? <div onClick={() => setShowDropDown(false)} className="overlay-select"></div> : ''}
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

            <div className="react-list-data-here">
              {supplierData.map((list) => (
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
