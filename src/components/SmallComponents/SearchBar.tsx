import list_saerch from '../../assets/list_search.jpg';
import column_img from '../../assets/columnimg.svg';
import search_icon from '../../assets/search.svg';
import { t } from '../../global/transShim';

export default function SearchBar() {
  // pl-lg-0 lh-1 px-0 pl-3 py-lg-2

  //my-md-0 lh-1
  return (
    <div className="px-1 searchBar">
      <div className="row justify-content-between ">
        <div className="col-md-6 col-sm-12">
          <div className="input-group br-10 input-group-sm  rounded px-3 bg-white z-0">
            <input
              type="text"
              className="form-control input-focus-none search_placeholder br-10 border-0"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              placeholder={t('search')}
            />
            <div className="input-group-prepend">
              <button className="input-group-text br-10 bg-white" id="inputGroup-sizing-sm">
                <img src={search_icon} height="20" alt="" />
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-8 d-md-block d-none">
          <div className="d-flex w-100 justify-content-end searchBarButtonContainer">
            <button className="btn w-xxl-251px fs-18 fw-bold bg-c4c4c4  p-3  text-white border-0 br-8 advance-search-hover">
              <img src={list_saerch} className="invert mr-3 " height="26" alt="" />
              {t('AdvancedSearch')}
            </button>
            <button className="btn w-xxl-251px ml-3 my-auto p-3  fs-18 fw-bold bg-purple text-white border-0 br-8 view-columns-hover">
              <img src={column_img} className="mr-3" height="25" alt="" /> {t('ViewColumns')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
