import { useState } from 'react';
import {
  UpdownIcon,
  DustbinDeleteOrderIcon,
  DispatchedOrderIcon,
  HandStopOrderIcon,
  ProcessOrderIcon,
  ThreeDotsColumnIcon
} from '../common/Icons';
import ErrorIcon from '../../assets/erroricon.svg';
import InProgressIcon from '../../assets/progressicon.svg';
import PasuedIcon from '../../assets/pasuedicon.svg';
import DispatchIcon from '../../assets/dispatchedicon.svg';
import AoDisabled from '../../assets/ao-disabled-img.png';
import { Dropdown } from 'react-bootstrap';
import OrderStateModal from '../modals/OrderStateModal';
import { t } from '../../global/transShim';
import Pagination from '../common/Pagination';
import '../../css/orders.min.css';

interface props {
  tableValue?: boolean;
  setOrderNumber?: (arg0: number) => void;
  showModal?: (e: React.MouseEvent) => void;
  orderSelectedArray?: Array<number>;
  headerData: Array<any>;
  bodyData: Array<any>;
}

const ContentTable = (tableProps: props) => {
  const { tableValue, setOrderNumber, showModal, orderSelectedArray, headerData, bodyData } = tableProps;
  const [AoDisabledModal, setAoDisabledModal] = useState(false);

  const handleAllchecked = () => {
    if (setOrderNumber) setOrderNumber(bodyData.length);
  };

  return (
    <div className={`${tableValue ? 'table-order-responsive' : 'table-with-open-sidebar'} table-responsive`}>
      <table className="table order-table mb-0">
        <thead className="order-table-head">
          <tr>
            <th>
              <label className="select-all-checkbox">
                <input onChange={handleAllchecked} type="checkbox" />
                <span className="checkmark"></span>
              </label>
            </th>
            {headerData.map((heading) => (
              <th key={heading} className="order-th-none">
                <span className="mr-2"> {t(heading)}</span> <UpdownIcon />
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="order-table-body">
          {bodyData.map((obj) => {
            const isSelected = orderSelectedArray?.includes(obj.id);
            return (
              <tr key={obj.id} className="cursor-pointer" data-id={obj.id} onClick={showModal}>
                <td>
                  <label className="select-all-checkbox">
                    <input type="checkbox" checked={isSelected} />
                    <span className="checkmark"></span>
                  </label>
                </td>
                <td>
                  <img src={obj.img} alt="" />
                </td>
                <td className="obj-sale-body order-td-none">{obj.sale ? obj.sale : obj.itemNo}</td>
                <td className="obj-sale-body order-td-none">{obj.source}</td>
                <td className="obj-sale-title order-td-none">{obj.title}</td>
                <td className="obj-sale-qty order-td-none">{obj.qty ? obj.qty : obj.sell}</td>
                <td className="obj-sale-qty order-td-none">{obj.sold}</td>
                <td className="obj-sale-cost  order-td-none">{obj.cost}</td>
                <td className="obj-sale-qty  order-td-none">{obj.fees}</td>
                <td className="obj-profit-text">{obj.profit}</td>
                <td className="obj-sale-cost order-td-none">{obj.margin}</td>
                <td className="obj-sale-qty  order-td-none">{obj.orderOn}</td>
                <td>
                  <button
                    onClick={() => (obj.state === 'AO Disabled' ? setAoDisabledModal(true) : undefined)}
                    className={`btn btn-state-style ${obj.state === 'Error' ? 'bg-dark-pink' : ''} ${
                      obj.state === 'In progress' ? 'in-progress-btn' : ''
                    } ${obj.state === 'Dispatched' ? 'bg-color-dark-green' : ''} ${
                      obj.state === 'Paused' ? 'bg-color-light-orange' : ''
                    } ${obj.state === 'AO Disabled' ? 'ao-disabled-btn-style' : ''} obj-state-text `}
                  >
                    {obj.state === 'Error' ? <img className="mr-2" src={ErrorIcon} alt="" /> : ''}
                    {obj.state === 'In progress' ? <img className="mr-2" src={InProgressIcon} alt="" /> : ''}
                    {obj.state === 'Dispatched' ? <img className="mr-2" src={DispatchIcon} alt="" /> : ''}
                    {obj.state === 'Paused' ? <img className="mr-2" src={PasuedIcon} alt="" /> : ''}
                    {obj.state === 'AO Disabled' ? <img className="mr-2" src={AoDisabled} alt="" /> : ''}
                    {obj.state}
                  </button>
                </td>
                <td className="order-three-dots-dropdown">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      <ThreeDotsColumnIcon />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <ProcessOrderIcon />
                        <span className="ml-2"> {t('OrderDetails.ProcessOrder')}</span>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <span>
                          <HandStopOrderIcon />
                          <span className="ml-2"> {t('OrderDetails.StopOrder')} </span>
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <DispatchedOrderIcon />
                        <span className="ml-2"> {t('OrderDetails.MarkAsDispatched')}</span>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <DustbinDeleteOrderIcon />
                        <span className="ml-2">{t('OrderDetails.DeleteOrder')} </span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <OrderStateModal AoDisabledModal={AoDisabledModal} setAoDisabledModal={setAoDisabledModal} />
      <Pagination />
    </div>
  );
};

export default ContentTable;
