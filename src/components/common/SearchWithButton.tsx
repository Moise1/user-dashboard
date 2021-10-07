import React from 'react';
import list_saerch from '../../assets/list_search.jpg';
import { t } from '../../global/transShim';
import SearchInput from '../SmallComponents/SearchInput';

const SearchWithButton = () => {
  return (
    <>
      <div className="d-flex flex-column flex-sm-row p-3 p-sm-0">
        <SearchInput />
        <div className="ml-sm-3 ml-0 mt-3 mt-sm-0">
          <button className="btn advance-search-purple-button">
            <img src={list_saerch} className="invert mr-3 " height="26" alt="" />
            {t('AdvancedSearch')}
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchWithButton;
