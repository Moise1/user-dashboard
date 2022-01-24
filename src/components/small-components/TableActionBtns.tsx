import { ReactElement } from 'react';
import { Input, Button } from 'antd';
import {Search as SearchIcon} from 'react-feather';
import advancedSearchIcon from '../../assets/listsearch.svg';
import column_img from '../../assets/columnimg.svg';
import RDS from 'react-dom/server';
import { t } from '../../global/transShim';
import '../../sass/light-theme/table-action-btns.scss';

interface TableActionBtnsProps {
  showColumns?: boolean;
  onClick?: () => void;
  handleSideDrawer?: () => void;
  handleShowColumns?: () => void;
}

export interface InputProps {
  value?: string;
  onSearch?: (value: string) => void;
}

export const SearchInput = ({ value, onSearch }: InputProps) => {
  const { Search } = Input;
  const searchComponent = t('search');
  const search = RDS.renderToString(searchComponent as ReactElement);

  return (
    <Search
      placeholder={search}
      onSearch={onSearch}
      value={value}
      suffix={<SearchIcon/>}
    />
  );
};

export const TableActionBtns = ({ showColumns, handleShowColumns, handleSideDrawer }: TableActionBtnsProps) => {
  return (
    <div className="search-bars-container">
      <Button className="advanced-search-btn" onClick={handleSideDrawer}>
        <img src={advancedSearchIcon} height="20" alt="" />
        {t('AdvancedSearch')}
      </Button>
      {showColumns && (
        <Button className="view-columns" onClick={handleShowColumns}>
          <img src={column_img} height="20" alt="" /> {t('showColumns')}
        </Button>
      )}
    </div>
  );
};
