import moment from 'moment';
import { useState } from 'react';
import { Space, Button, Form, Input, Checkbox, DatePicker, DatePickerProps } from 'antd';
import { AdvancedSearch, AdvancedSearchProps } from './AdvancedSearch';
import { SuccessBtn, TransparentBtn } from './ActionBtns';
import '../sass/advanced-search.scss';
import { ICatalogData } from '../dummy-data/dummyData';

interface Props extends AdvancedSearchProps {
  openSourceModal?: () => void;
  setAllProducts?: React.Dispatch<React.SetStateAction<ICatalogData[]>>;
  catalogData?: ICatalogData[];
}

interface catalogAdvancedSearchFieldTypes {
  title: string;
  minSourcePrice?: number | undefined;
  minProfile?: number | undefined;
  maxSourcePrice?: number | undefined;
  maxProfile?: number | undefined;
  orderBy?: string | undefined
}

export const CatalogFilters = (props: Props) => {

  const { visible, onClose, openSourceModal, catalogData } = props;

  const catalogAdvanceSearchIntialTypes: catalogAdvancedSearchFieldTypes = {
    title: '',
    orderBy: 'Default'
  };

  const [catalogAdvancedSearchFormData, setCatalogAdvancedSearchFormData] = useState(catalogAdvanceSearchIntialTypes);

  const catalogAdvancedSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCatalogAdvancedSearchFormData({
      ...catalogAdvancedSearchFormData,
      [name]: value
    });
  };

  const clearFilterHandler = () => {
    setCatalogAdvancedSearchFormData(catalogAdvanceSearchIntialTypes);
  };

  const handleFilterSubmit = () => {

    const filterResult = catalogData?.filter(product => {
      console.log('The search.title', product.title);
      return product.title == catalogAdvancedSearchFormData.title;
      // (String(e.cost) < String(catalogAdvancedSearchFormData.maxSourcePrice)) ||
      // (String(e.cost) > String(catalogAdvancedSearchFormData.minSourcePrice)) ||
      // (String(e.profit) > String(catalogAdvancedSearchFormData.maxProfile)) ||
      // (String(e.profit) > String(catalogAdvancedSearchFormData.minProfile));
    }
    );
    console.log('The filterResult ', filterResult);
  };

  return (
    <AdvancedSearch
      title="Search Criteria"
      placement="right"
      onClose={onClose}
      visible={visible}
      extra={
        <Space>
          <Button className="clear-filters">Close filters</Button>
        </Space>
      }
    >
      <div className="advanced-form-container">
        <h5>
          <strong>Choose your suppliers</strong>
        </h5>
        <Button className="supplier-one" onClick={openSourceModal}>
          1 supplier
        </Button>
        <Form layout="vertical" className="advanced-search-form" onFinish={handleFilterSubmit}>
          <div className="catalog-filters-inputs">
            <Form.Item label="Min source price">
              <Input className="blue-input"
                name="minSourcePrice"
                defaultValue={catalogAdvancedSearchFormData.minSourcePrice}
                onChange={catalogAdvancedSearchOnChange}
              />
            </Form.Item>

            <Form.Item label="Min Profit">
              <Input className="blue-input"
                name="minProfile"
                onChange={catalogAdvancedSearchOnChange}
                defaultValue={catalogAdvancedSearchFormData.minProfile}
              />
            </Form.Item>

            <Form.Item label="Max source price">
              <Input className="blue-input"
                name="maxSourcePrice"
                onChange={catalogAdvancedSearchOnChange}
                defaultValue={catalogAdvancedSearchFormData.maxSourcePrice}
              />
            </Form.Item>

            <Form.Item label="Max Profit">
              <Input className="blue-input"
                name="maxProfile"
                onChange={catalogAdvancedSearchOnChange}
                defaultValue={catalogAdvancedSearchFormData.maxProfile}
              />
            </Form.Item>
          </div>

          <div className="prime-options">
            <p className="amazon-prime">
              <strong>Amazon Prime</strong>
            </p>
            <div className="checkboxes">
              <Checkbox checked className="checkbox" >
                Only Prime
              </Checkbox>
              <Checkbox className="checkbox"
              >All Items</Checkbox>
            </div>
          </div>

          <Form.Item label="Title">
            <Input className="blue-input" placeholder="Contains..." name="title"
              defaultValue={catalogAdvancedSearchFormData.title}
              onChange={catalogAdvancedSearchOnChange}
            />
          </Form.Item>
          <Form.Item label="Order By">

            <Input className="blue-input"
              defaultValue={catalogAdvancedSearchFormData.orderBy}
              onChange={catalogAdvancedSearchOnChange}
              name="orderBy"
            />
          </Form.Item>
          <div className="action-btns">
            <TransparentBtn
              handleClick={clearFilterHandler}
            >Clear filters</TransparentBtn>
            <SuccessBtn htmlType='submit'> Apply filters</SuccessBtn>
          </div>
        </Form>
      </div>
    </AdvancedSearch>
  );
};

export const ListingsAdvancedSearch = (props: AdvancedSearchProps) => {
  const { Search } = Input;

  const { visible, onClose, closable, setSearchTxt } = props;
  const handleDateChange: DatePickerProps['onChange'] = (date) => {
    const dateValue = moment(date).format('YYYY-MM-DD');
    setSearchTxt!(dateValue);
  };

  return (
    <AdvancedSearch
      className="listings-advanced-search"
      title="Advanced Search"
      placement="right"
      onClose={onClose}
      visible={visible}
      closable={closable}
    >
      <div className="advanced-form-container">
        <Form layout="vertical" className="advanced-search-form">
          <div className="listings-search-inputs">
            <Form.Item label="Asin">
              <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} />
            </Form.Item>

            <Form.Item label="Sku">
              <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} />
            </Form.Item>

            <Form.Item label="Cost Price">
              <div className="cost-price-section">
                <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} placeholder="Min" />
                <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} placeholder="Max" />
              </div>
            </Form.Item>

            <Form.Item label="Source">
              <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} />
            </Form.Item>

            <Form.Item label="Title">
              <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} />
            </Form.Item>

            <Form.Item label="Sell Price">
              <div className="sell-price-section">
                <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} placeholder="Min" />
                <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} placeholder="Max" />
              </div>
            </Form.Item>
          </div>

          <div className="check-boxes">
            <Form.Item className="monitor-price-options" label="Monitor Price">
              <Checkbox checked className="checkbox">
                Yes
              </Checkbox>
              <Checkbox className="checkbox">No</Checkbox>
            </Form.Item>

            <Form.Item className="price-decrease-options" label="Price Decrease">
              <Checkbox className="checkbox">Yes</Checkbox>
              <Checkbox className="checkbox">No</Checkbox>
            </Form.Item>
          </div>

          <div className="extra-options">
            <Form.Item label="Quantiy">
              <div className="quantiy-section">
                <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} placeholder="Min" />
                <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} placeholder="Max" />
              </div>
            </Form.Item>

            <Form.Item label="Out of stock days">
              <div className="out-of-stock-section">
                <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} placeholder="Min" />
                <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} placeholder="Max" />{' '}
              </div>
            </Form.Item>

            <Form.Item label="Created On">
              <DatePicker className="date-picker" onChange={handleDateChange} />
            </Form.Item>

            <Form.Item label="Created by">
              <Search onChange={(e) => setSearchTxt!(e.target.value)} placeholder="Contains..." />
            </Form.Item>

            <Form.Item label="Unsold days">
              <div className="unsold-days-section">
                <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} placeholder="Min" />
                <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} placeholder="Max" />{' '}
              </div>
            </Form.Item>

            <Form.Item label="Ignore Rules">
              <Checkbox className="checkbox">Yes</Checkbox>
              <Checkbox className="checkbox">No</Checkbox>
            </Form.Item>
          </div>
        </Form>
      </div>
    </AdvancedSearch>
  );
};
