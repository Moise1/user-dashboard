import { Moment } from 'moment';
import { Form, Input, DatePicker } from 'antd';
import { RangeValue } from 'rc-picker/lib/interface';
import { AdvancedSearch } from './AdvancedSearch';
import { SuccessBtn } from './ActionBtns';
import { useEffect, useState } from 'react';
import { OrderData } from '../redux/orders/orderSlice';
import '../sass/advanced-search.scss';

interface Props {
  visible?: boolean;
  onClose?: () => void;
  order: Array<OrderData>;
  setSearchKey?: (searchKey: string) => void;
  setSearchedArray?: React.Dispatch<React.SetStateAction<OrderData[]>>;
  setSearchFilterKey?: (searchedArray: []) => void;
}

interface AdvancedSearchFieldTypes {
  reference?: string | undefined;
  channelItem?: string | undefined;
  title?: string | undefined;
  fees?: number | undefined;
  sold?: number | undefined;
  cost?: number | undefined;
  profit?: number | undefined;
  margin?: number | undefined;
  status?: string | undefined;
  min?: number | undefined;
  max?: number | undefined;
}

export const OrdersAdvancedSearch = (props: Props) => {
  const { order, setSearchedArray } = props;

  /*eslint-disable @typescript-eslint/no-empty-function */
  useEffect(() => {}, [setSearchedArray]);

  const advanceSearchIntialTypes: AdvancedSearchFieldTypes = {
    reference: '',
    channelItem: '',
    title: '',
    status: ''
  };


  const [orderAdvancedSearchFormData, setOrderAdvancedSearchFormData] = useState(advanceSearchIntialTypes);
  const orderAdvancedSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderAdvancedSearchFormData({
      ...orderAdvancedSearchFormData,
      [name]: value
    });
  };

  const { RangePicker } = DatePicker;
  const { visible, onClose } = props;

  const handleRangePicker = (value: RangeValue<Moment>, dateString: [string, string]) => {
    console.log('The value from date picker is', value);
    console.log('The dateString from date picker is', dateString);
  };

  const handleFilterSubmit = () => {
    let result;
    result = order.filter(
      (e: OrderData) =>
        e.reference === orderAdvancedSearchFormData.reference ||
        e.channelItem === orderAdvancedSearchFormData.channelItem ||
        e.title === orderAdvancedSearchFormData.title ||
        String(e.fees) === String(orderAdvancedSearchFormData.fees) ||
        String(e.profit) === String(orderAdvancedSearchFormData.profit) ||
        String(e.channelPrice) === String(orderAdvancedSearchFormData.sold) ||
        String(e.sourcePrice) === String(orderAdvancedSearchFormData.cost) ||
        String(e.margin) === String(orderAdvancedSearchFormData.margin) ||
        (String(e.quantity) < String(orderAdvancedSearchFormData.max) &&
          String(e.quantity) > String(orderAdvancedSearchFormData.min))
    );

    // Filtering Left: (1) Source (2) Quanitity (3) Created on
    setSearchedArray?.(result);
    result = [];
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
        <Form layout="vertical" className="advanced-search-form" onFinish={handleFilterSubmit}>
          <div className="listings-search-inputs">
            <Form.Item label="Reference">
              <Input
                className="blue-input"
                name="reference"
                defaultValue={advanceSearchIntialTypes.reference}
                onChange={orderAdvancedSearchOnChange}
              />
            </Form.Item>

            <Form.Item label="Source">
              <Input
                className="blue-input"
                name="source"
              />
            </Form.Item>

            <Form.Item label="Quantity">
              <div className="cost-price-section">
                <Input
                  className="blue-input"
                  placeholder="Min"
                  name="min"
                  value={advanceSearchIntialTypes.min}
                  onChange={orderAdvancedSearchOnChange}
                />
                <Input
                  className="blue-input"
                  placeholder="Max"
                  name="max"
                  value={advanceSearchIntialTypes.max}
                  onChange={orderAdvancedSearchOnChange}
                />
              </div>
            </Form.Item>

            <Form.Item label="Channel Item">
              <Input
                className="blue-input"
                name="channelItem"
                defaultValue={advanceSearchIntialTypes.channelItem}
                onChange={orderAdvancedSearchOnChange}
              />
            </Form.Item>

            <Form.Item label="Title">
              <Input
                className="blue-input"
                name="title"
                defaultValue={advanceSearchIntialTypes.title}
                onChange={orderAdvancedSearchOnChange}
              />
            </Form.Item>

            <Form.Item label="Sold">
              <Input
                className="blue-input"
                name="sold"
                defaultValue={advanceSearchIntialTypes.sold}
                onChange={orderAdvancedSearchOnChange}
              />
            </Form.Item>
          </div>
          <div className="listings-search-inputs">
            <Form.Item label="Cost">
              <Input
                className="blue-input"
                name="cost"
                defaultValue={advanceSearchIntialTypes.cost}
                onChange={orderAdvancedSearchOnChange}
              />
            </Form.Item>

            <Form.Item label="Profit">
              <Input
                className="blue-input"
                name="profit"
                defaultValue={advanceSearchIntialTypes.profit}
                onChange={orderAdvancedSearchOnChange}
              />
            </Form.Item>

            <Form.Item label="Fees">
              <Input
                className="blue-input"
                name="fees"
                defaultValue={advanceSearchIntialTypes.fees}
                onChange={orderAdvancedSearchOnChange}
              />
            </Form.Item>

            <Form.Item label="Margin">
              <Input className="blue-input" name="margin" defaultValue={advanceSearchIntialTypes.margin} />
            </Form.Item>
          </div>

          <div className="listings-search-inputs">
            <Form.Item label="Created On">
              <RangePicker onChange={handleRangePicker} separator={<>-</>} className="date-picker" />
            </Form.Item>

            <Form.Item label="Status">
              <Input className="blue-input" name="status" />
            </Form.Item>
          </div>
          <div className="filters-section">
            <SuccessBtn htmlType="submit">Apply filters</SuccessBtn>
          </div>
        </Form>
      </div>
    </AdvancedSearch>
  );
};
