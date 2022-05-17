import { Moment } from 'moment';
import { Form, Input, DatePicker } from 'antd';
import { RangeValue } from 'rc-picker/lib/interface';
import { AdvancedSearch } from './AdvancedSearch';
import { SuccessBtn } from './ActionBtns';
import { useEffect, useState } from 'react';
import { OrderData } from '../redux/orders/orderSlice';
import '../sass/advanced-search.scss';

// interface Props extends AdvancedSearchProps {
//   openSourceModal?: () => void;
// }
// export const CatalogFilters = (props: Props) => {
//   const { visible, onClose, openSourceModal } = props;
//   return (
//     <AdvancedSearch
//       title="Search Criteria"
//       placement="right"
//       onClose={onClose}
//       visible={visible}
//       extra={
//         <Space>
//           <Button className="clear-filters">Close filters</Button>
//         </Space>
//       }
//     >
//       <div className="advanced-form-container">
//         <h5>
//           <strong>Choose your suppliers</strong>
//         </h5>
//         <Button className="supplier-one" onClick={openSourceModal}>
//           1 supplier
//         </Button>
//         <Form layout="vertical" className="advanced-search-form">
//           <div className="catalog-filters-inputs">
//             <Form.Item label="Min source price">
//               <Input className="blue-input" value="50" />
//             </Form.Item>
//             <Form.Item label="Min Profit">
//               <Input className="blue-input" value="Mini" />
//             </Form.Item>
//             <Form.Item label="Max source price">
//               <Input className="blue-input" value="100" />
//             </Form.Item>
//             <Form.Item label="Max Profit">
//               <Input className="blue-input" value="Max" />
//             </Form.Item>
//           </div>
//           <div className="prime-options">
//             <p className="amazon-prime">
//               <strong>Amazon Prime</strong>
//             </p>
//             <div className="checkboxes">
//               <Checkbox checked className="checkbox">
//                 Only Prime
//               </Checkbox>
//               <Checkbox className="checkbox">All Items</Checkbox>
//             </div>
//           </div>
//           <Form.Item label="Title">
//             <Input className="blue-input" placeholder="Contains..." />
//           </Form.Item>
//           <Form.Item label="Order By">
//             <Input className="blue-input" value="Default" />
//           </Form.Item>
//           <div className="action-btns">
//             <TransparentBtn>Clear filters</TransparentBtn>
//             <SuccessBtn>Apply filters</SuccessBtn>
//           </div>
//         </Form>
//       </div>
//     </AdvancedSearch>
//   );
// };

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
  const { order, setSearchKey, setSearchedArray, setSearchFilterKey } = props;

  useEffect(() => {
    console.log('i render');
  }, [setSearchedArray]);
  const advanceSearchIntialTypes: AdvancedSearchFieldTypes = {
    reference: '',
    channelItem: '',
    title: '',
    // fees: 0,
    // sold: 0,
    // cost: 0,
    // profit: 0,
    // margin: 0,
    status: '',
    // min:0;
    // max:0;
  };

  console.log(setSearchKey);
  console.log(setSearchedArray);
  console.log(setSearchFilterKey);

  const [orderAdvancedSearchFormData, setOrderAdvancedSearchFormData] = useState(advanceSearchIntialTypes);
  const orderAdvancedSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('the e', e.target);
    const { name, value } = e.target;
    setOrderAdvancedSearchFormData({
      ...orderAdvancedSearchFormData,
      [name]: value
    });
  };

  const { RangePicker } = DatePicker;
  const { visible, onClose } = props;

  const handleRangePicker = (value: RangeValue<Moment>, dateString: [string, string]) => {
    console.log('The value from date picker is',value);
    console.log('The dateString from date picker is',dateString);
  };

  const handleFilterSubmit = () => {
    let result;
    console.log('the order', order);
    console.log('The result', result);
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
    String(e.quantity) < String(orderAdvancedSearchFormData.max) && String(e.quantity) > String(orderAdvancedSearchFormData.min)
    );

    // Filtering Left: (1) Source (2) Quanitity (3) Created on
    console.log('The object value is',orderAdvancedSearchFormData);
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
                // defaultValue={advanceSearchIntialTypes.reference}
                // onChange={orderAdvancedSearchOnChange}
              />
            </Form.Item>

            <Form.Item label="Quantity">
              <div className="cost-price-section">
                <Input className="blue-input" placeholder="Min" name="min" value={advanceSearchIntialTypes.min} onChange={orderAdvancedSearchOnChange}/>
                <Input className="blue-input" placeholder="Max" name="max" value={advanceSearchIntialTypes.max}  onChange={orderAdvancedSearchOnChange}/>
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
            {/* <Form.Item label="Sell Price">
              <div className="sell-price-section">
                <Input className="blue-input" placeholder="Min" />
                <Input className="blue-input" placeholder="Max" />
              </div>
            </Form.Item> */}
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
                // defaultValue={JSON.stringify(advanceSearchIntialTypes.fees)}
                defaultValue={advanceSearchIntialTypes.fees}
                onChange={orderAdvancedSearchOnChange}
                // type="number"
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

          {/* other */}
          {/* <div className="check-boxes">
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
          </div> */}

          {/* <div className="extra-options">
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
              <RangePicker onChange={handleRangePicker} separator={<>-</>} className="date-picker" />
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
          </div> */}
          <div className="filters-section">
            <SuccessBtn htmlType="submit">Apply filters</SuccessBtn>
          </div>
        </Form>
      </div>
    </AdvancedSearch>
  );
};
