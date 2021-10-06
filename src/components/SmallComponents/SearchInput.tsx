import React from 'react';
import search_icon from '../../assets/search.svg';
import { ReactElement } from 'react';
import RDS from 'react-dom/server';
import { t } from '../../global/transShim';

const SearchInput = () => {
  const searchComponent = t('search');
  const tSearchString = RDS.renderToString(searchComponent as ReactElement);

  return (
    <>
      <div className="input-group br-10 input-group-sm rounded px-3 bg-white z-0 searchBar">
        <input
          type="text"
          className="form-control input-focus-none search_placeholder br-10 border-0"
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          placeholder={tSearchString}
        />
        <div className="input-group-prepend">
          <button className="input-group-text br-10 bg-white" id="inputGroup-sizing-sm">
            <img src={search_icon} height="20" alt="" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchInput;
