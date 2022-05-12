import { Moment } from 'moment';
import { Form, Input, DatePicker } from 'antd';
// import { Space, Button, Form, Input, Checkbox, DatePicker } from 'antd';
// import { Space, Button, Form, Input, Checkbox } from 'antd';
import { RangeValue } from 'rc-picker/lib/interface';
import { AdvancedSearch } from './AdvancedSearch';
// import { SuccessBtn, TransparentBtn } from './ActionBtns';
import { SuccessBtn } from './ActionBtns';
import '../sass/advanced-search.scss';
import { useState } from 'react';
import { OrderData } from '../redux/orders/orderSlice';

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
  setSearchedArray?: (searchedArray: []) => void | unknown;
  setSearchFilterKey?: (searchedArray: []) => void;
}

interface AdvancedSearchFieldTypes {
  reference?: string | undefined;
  channelItem?: string | undefined;
  title?: string | undefined;
  sold?: string | undefined;
  cost?: string | undefined;
  fees?: number | undefined;
  profit?: number | undefined;
  margin?: number | undefined;
  status?: string | undefined;
}

export const OrdersAdvancedSearch = (props: Props) => {
  const { order, setSearchKey, setSearchedArray, setSearchFilterKey } = props;
  const advanceSearchIntialTypes: AdvancedSearchFieldTypes | undefined = {
    reference: 'abc',
    channelItem: 'abc',
    title: 'abc',
    sold: 'abc',
    cost: 'abc',
    fees: 0,
    profit: 0,
    margin: 0,
    status: 'abc'
  };

  console.log(setSearchKey);
  console.log(setSearchedArray);
  console.log(setSearchFilterKey);

  const [orderAdvancedSearchFormData, setOrderAdvancedSearchFormData] = useState(advanceSearchIntialTypes);
  // const [advSearchedArray, setAdvSearchArray] = useState([]);
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
    console.log(dateString);
    console.log(value);
  };

  const handleFilterSubmit = () => {
    console.log(
      order.filter(
        (e: OrderData) =>
          e.channelItem === orderAdvancedSearchFormData.channelItem ||
          e.title === orderAdvancedSearchFormData.title ||
          e.reference === orderAdvancedSearchFormData.reference ||
          e.sold === orderAdvancedSearchFormData.sold ||
          e.cost === orderAdvancedSearchFormData.cost
      )
    );
    // setSearchedArray(orders.filter((e: advancedSearchFieldTypes) => e.channelItem === String(orderAdvancedSearchFormData.channelItem)));
    // setSearchFilterKey(orders.filter((e: advancedSearchFieldTypes) => e.channelItem === String(orderAdvancedSearchFormData.channelItem)));
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

            {/* <Form.Item label="Source">
              <Input
                className="blue-input"
                name="source"
                defaultValue={advanceSearchIntialTypes.source}
                onChange={orderAdvancedSearchOnChange}
              />
            </Form.Item> */}

            <Form.Item label="Quantity">
              <div className="cost-price-section">
                <Input className="blue-input" placeholder="Min" />
                <Input className="blue-input" placeholder="Max" />
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
                defaultValue={advanceSearchIntialTypes.fees}
                onChange={orderAdvancedSearchOnChange}
              />
            </Form.Item>

            <Form.Item label="Margin">
              <Input
                className="blue-input"
                name="margin"
                defaultValue={advanceSearchIntialTypes.margin}
                onChange={orderAdvancedSearchOnChange}
              />
            </Form.Item>
          </div>

          <div className="listings-search-inputs">
            <Form.Item label="Created On">
              <RangePicker onChange={handleRangePicker} separator={<>-</>} className="date-picker" />
            </Form.Item>

            <Form.Item label="Status">
              <Input
                className="blue-input"
                name="status"
                defaultValue={advanceSearchIntialTypes.status}
                onChange={orderAdvancedSearchOnChange}
              />
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