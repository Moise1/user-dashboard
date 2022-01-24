import { ReactElement } from 'react';
import advancedSearchIcon from '../../assets/listsearch.svg';
import column_img from '../../assets/columnimg.svg';
import RDS from 'react-dom/server';
import { t } from '../../global/transShim';
import '../../sass/light-theme/table-action-btns.scss';
import {Input} from 'antd';

interface TableActionBtnsProps {
  showColumns?: boolean;
  onClick? : () => void;
  handleSideDrawer?: () => void;
}

export interface InputProps{
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

}

export const SearchInput = ({value, onChange}: InputProps) => {
  const {Search} = Input;
  const searchComponent = t('search');
  const search = RDS.renderToString(searchComponent as ReactElement);

  return (
    <div className="search-input">
      <Search
        placeholder={search}
        allowClear
        value={value}
        onChange={onChange}
        enterButton="Search"
      />
    </div>
  );
};

export const TableActionBtns = ({showColumns, onClick, handleSideDrawer}: TableActionBtnsProps) => {

  return (
    <div className="search-bars-container">
      <button className="advanced-search-btn" onClick={handleSideDrawer}>
        <img src={advancedSearchIcon} height="20" alt="" />
        {t('AdvancedSearch')}
      </button>
      {showColumns && (
        <button className="view-columns" onClick={onClick} >
          <img src={column_img} height="20" alt="" /> {t('showColumns')}/ {t('hideColumns')} 
        </button>
      )}
    </div>
  );
};
