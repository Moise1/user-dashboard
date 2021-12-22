import { ReactElement } from 'react';
import search_icon from '../../assets/search.svg';
import advancedSearchIcon from '../../assets/listsearch.svg';
import column_img from '../../assets/columnimg.svg';
import RDS from 'react-dom/server';
import { t } from '../../global/transShim';
import '../../sass/light-theme/search-bars.scss';

interface props {
  showColumns?: boolean;
}

export const SearchInput = () => {
  const searchComponent = t('search');
  const search = RDS.renderToString(searchComponent as ReactElement);

  return (
    <div className="search-input">
      <input
        type="text"
        className="input"
        aria-label="small"
        aria-describedby="inputGroup-sizing-sm"
        placeholder={search}
      />
      <button className="search-icon-btn">
        <img src={search_icon} height="20" alt="" />
      </button>
    </div>
  );
};

export const SearchBars = (searchBarProps: props) => {
  const { showColumns } = searchBarProps;

  return (
    <div className="search-bars-container">
      <SearchInput />
      <button className="advanced-search-btn">
        <img src={advancedSearchIcon} height="20" alt="" />
        {t('AdvancedSearch')}
      </button>

      {showColumns && (
        <button className="view-columns">
          <img src={column_img} height="20" alt="" /> {t('ViewColumns')}
        </button>
      )}
    </div>
  );
};
