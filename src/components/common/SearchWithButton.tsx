import list_saerch from '../../assets/list_search.jpg';
import { t } from '../../global/transShim';
import SearchInput from '../SmallComponents/SearchInput';

const SearchWithButton = () => {
  return (
    <>
      <div className="d-flex flex-column flex-sm-row p-0 mt-2">
        <SearchInput />
        <div className="ml-sm-3 ml-0 mt-3 mt-sm-0 d-none d-md-block">
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
