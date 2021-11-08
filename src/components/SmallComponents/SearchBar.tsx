import list_search from '../../assets/list_search.jpg';
import column_img from '../../assets/columnimg.svg';
import SearchInput from './SearchInput';
import { t } from '../../global/transShim';
import { useLocation } from 'react-router-dom';

interface props {
  className: string;
}
const SearchBar = (searchBarProps: props) => {
  const { className } = searchBarProps;
  const location = useLocation();

  return (
    <div className={className}>
      <div className="row justify-content-between">
        <div className="col-md-6 col">
          <SearchInput />
        </div>
        <div className="col-md-6 col-auto">
          <div className="d-flex w-100 justify-content-end searchBarButtonContainer">
            <button className="btn w-xxl-251px fs-18 fw-bold bg-c4c4c4  p-2 p-lg-3  text-white border-0 br-8 advance-search-hover">
              <img src={list_search} className="invert mr-3 " height="26" alt="" />
              {t('AdvancedSearch')}
            </button>
            {location.pathname !== '/orders' && (
              <button className="d-none d-lg-block btn w-xxl-251px ml-3 my-auto p-3  fs-18 fw-bold bg-purple text-white border-0 br-8 view-columns-hover">
                <img src={column_img} className="mr-3" height="25" alt="" /> {t('ViewColumns')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
