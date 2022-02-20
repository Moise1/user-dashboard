import { Moment } from 'moment';
import { Space, Button, Form, Input, Checkbox, DatePicker } from 'antd';
import { RangeValue } from 'rc-picker/lib/interface';
import { AdvancedSearch } from './AdvancedSearch';
import { AdvancedSearchProps } from './AdvancedSearch';
import { SuccessBtn, TransparentBtn } from './ActionBtns';
import '../../sass/light-theme/search-options.scss';

interface OtherDrawerProps {
  openSourceModal?: () => void;
}

export const CatalogFilters = (props: AdvancedSearchProps & OtherDrawerProps) => {
  const { visible, onClose, openSourceModal } = props;
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
        <Form layout="vertical" className="advanced-search-form">
          <div className="catalog-filters-inputs">
            <Form.Item label="Min source price">
              <Input className="blue-input" value="50" />
            </Form.Item>

            <Form.Item label="Min Profit">
              <Input className="blue-input" value="Mini" />
            </Form.Item>
            <Form.Item label="Max source price">
              <Input className="blue-input" value="100" />
            </Form.Item>
            <Form.Item label="Max Profit">
              <Input className="blue-input" value="Max" />
            </Form.Item>
          </div>

          <div className="prime-options">
            <p className="amazon-prime">
              <strong>Amazon Prime</strong>
            </p>
            <div className="checkboxes">
              <Checkbox checked className="checkbox">
                Only Prime
              </Checkbox>
              <Checkbox className="checkbox">All Items</Checkbox>
            </div>
          </div>

          <Form.Item label="Title">
            <Input className="blue-input" placeholder="Contains..." />
          </Form.Item>
          <Form.Item label="Order By">
            <Input className="blue-input" value="Default" />
          </Form.Item>
          <div className="action-btns">
            <TransparentBtn>Clear filters</TransparentBtn>
            <SuccessBtn>Apply filters</SuccessBtn>
          </div>
        </Form>
      </div>
    </AdvancedSearch>
  );
};

export const ListingsAdvancedSearch = (props: AdvancedSearchProps) => {
  const { RangePicker } = DatePicker;

  const { visible, onClose } = props;

  const handleRangePicker = (value: RangeValue<Moment>, dateString: [string, string]) => {
    console.log(dateString);
    console.log(value);
  };
  return (
    <AdvancedSearch 
      className="listings-advanced-search"
      title="Advanced Search" 
      placement="right" 
      onClose={onClose} 
      visible={visible}
    >
      <div className="advanced-form-container">
        <Form layout="vertical" className="advanced-search-form">
          <div className="listings-search-inputs">
            <Form.Item label="Asin">
              <Input className="blue-input" />
            </Form.Item>

            <Form.Item label="Sku">
              <Input className="blue-input" />
            </Form.Item>

            <Form.Item label="Cost Price">
              <div className="cost-price-section">
                <Input className="blue-input" placeholder="Min" />
                <Input className="blue-input" placeholder="Max" />
              </div>
            </Form.Item>

            <Form.Item label="Source">
              <Input className="blue-input" />
            </Form.Item>

            <Form.Item label="Title">
              <Input className="blue-input" />
            </Form.Item>

            <Form.Item label="Sell Price">
              <div className="sell-price-section">
                <Input className="blue-input" placeholder="Min" />
                <Input className="blue-input" placeholder="Max" />
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
                <Input className="blue-input" placeholder="Min" />
                <Input className="blue-input" placeholder="Max" />
              </div>
            </Form.Item>

            <Form.Item label="Out of stock days">
              <div className="out-of-stock-section">
                <Input className="blue-input" placeholder="Min" />
                <Input className="blue-input" placeholder="Max" />{' '}
              </div>
            </Form.Item>

            <Form.Item label="Created On">
              <RangePicker 
                onChange={handleRangePicker} 
                separator={<>-</>} 
                className='date-picker'
              />
            </Form.Item>

            <Form.Item label="Created by">
              <Input className="blue-input" placeholder="Contains..." />
            </Form.Item>

            <Form.Item label="Unsold days">
              <div className="unsold-days-section">
                <Input className="blue-input" placeholder="Min" />
                <Input className="blue-input" placeholder="Max" />{' '}
              </div>
            </Form.Item>

            <Form.Item label="Ignore Rules">
              <Checkbox className="checkbox">Yes</Checkbox>
              <Checkbox className="checkbox">No</Checkbox>
            </Form.Item>
          </div>
          <div className="filters-section">
            <SuccessBtn>Apply filters</SuccessBtn>
          </div>
        </Form>
      </div>
    </AdvancedSearch>
  );
};
