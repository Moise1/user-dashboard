import { ReactElement, ReactNode } from 'react';
import { Input, Button } from 'antd';
import advancedSearchIcon from '../assets/icons/listsearch.svg';
import column_img from '../assets/icons/columnimg.svg';
import RDS from 'react-dom/server';
import { t } from '../utils/transShim';
import '../sass/table-action-btns.scss';
import { SearchOutlined } from '@ant-design/icons';

interface TableActionBtnsProps {
  showColumns?: boolean;
  onClick?: () => void;
  handleSideDrawer?: () => void;
  handleShowColumns?: () => void;
  showSeletectedProducts?: boolean;
  showAllSelectedProducts?: () => void;
  addAllProducts?: boolean;
  handleAddAllProducts?: () => void;
  clearAllSelectedProducts?: boolean;
  handleClearAllSelectedProducts?: () => void;
  children?: ReactNode;
}

export interface InputProps {
  value?: string;
  onSearch: (value: string) => void;
}

interface FiltersProps {
  handleSideDrawer?: () => void;
  children: ReactNode;
}

export const SearchInput = ({ value, onSearch }: InputProps) => {
  const { Search } = Input;
  const searchComponent = t('search');
  const search = RDS.renderToString(searchComponent as ReactElement);
  return (
    <Search 
      placeholder={search} 
      onSearch={onSearch} 
      onKeyUp={(event) => onSearch(event.currentTarget.value)} 
      value={value} suffix={<SearchOutlined />}/>
  );
};

export const TableActionBtns = (props: TableActionBtnsProps) => {
  const {
    showColumns,
    handleShowColumns,
    handleSideDrawer,
    showSeletectedProducts,
    showAllSelectedProducts,
    addAllProducts,
    handleAddAllProducts,
    clearAllSelectedProducts,
    handleClearAllSelectedProducts,
    children
  } = props;
  return (
    <div className="search-bars-container">
      <Button className="advanced-search-btn" onClick={handleSideDrawer}>
        <img src={advancedSearchIcon} height="20" alt="" />
        {children}
      </Button>
      {showColumns && (
        <Button className="view-columns-btn" onClick={handleShowColumns}>
          <img src={column_img} height="20" alt="" /> {t('Table.ShowColumns')}
        </Button>
      )}

      {showSeletectedProducts && (
        <p className="view-all-selected-products" onClick={showAllSelectedProducts}>
          View All Selected Products
        </p>
      )}

      {addAllProducts && (
        <Button className="add-all-products" onClick={handleAddAllProducts}>
          Add All
        </Button>
      )}

      {clearAllSelectedProducts && (
        <Button className="clear-all-products" onClick={handleClearAllSelectedProducts}>
          Clear All
        </Button>
      )}
    </div>
  );
};

export const FiltersBtn = ({ children, handleSideDrawer }: FiltersProps) => (
  <Button className="filters-btn" onClick={handleSideDrawer}>
    <img src={advancedSearchIcon} height="20" alt="" />
    {children}
  </Button>
);
