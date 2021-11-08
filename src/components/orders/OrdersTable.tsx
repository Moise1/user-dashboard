import { useState, ChangeEvent } from 'react';
import {
  UpdownIcon,
  DustbinDeleteOrderIcon,
  DispatchedOrderIcon,
  HandStopOrderIcon,
  ProcessOrderIcon,
  ThreeDotsColumnIcon
} from '../common/Icons';
import OrderData from '../common/OrderData';
import ErrorIcon from '../../assets/erroricon.svg';
import InProgressIcon from '../../assets/progressicon.svg';
import PasuedIcon from '../../assets/pasuedicon.svg';
import DispatchIcon from '../../assets/dispatchedicon.svg';
import AoDisabled from '../../assets/ao-disabled-img.png';
import { Dropdown } from 'react-bootstrap';
import OrderStateModal from '../modals/OrderStateModal';
import OrderStateProgressModal from '../modals/OrderStateProgressModal';
import OrderDetailsModal from '../modals/OrderDetailsModal';
import { t } from '../../global/transShim';
import Pagination from '../common/Pagination';
import '../../css/orders.min.css';
// import { Table } from 'react-bootstrap';

interface props {
  tableValue: boolean;
  setOrderNumber: (arg0: number) => void;
}

let orderSelectedArray: Array<number> = [];

const OrdersTable = (tableProps: props) => {
  const { tableValue, setOrderNumber } = tableProps;
  const [AoDisabledModal, setAoDisabledModal] = useState(false);
  const [orderProgress, setOrderProgress] = useState(1);
  const [show, setShow] = useState(false);
  const [saveObjectId, setSaveObjectId] = useState<number>(0);

  const [addressModalShow, setAddressModalShow] = useState(false);
  const [orderDetailsModalShow, setOrderDetailsModalShow] = useState(false);
  const [isSeletAllOrder, setSeletAllOrder] = useState(false);
  // const [orderSelectedArray, setOrderSelectedArray] = useState<IChecked>([]);

  console.log(setOrderProgress, isSeletAllOrder);

  // const orderSelectedArray = [];

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (orderSelectedArray.length > 0) {
      console.log(event.target.checked);
      // orderSelectedArray.push(saveObjectId);

      if (orderSelectedArray.filter((order) => order === saveObjectId).length > 0) {
        orderSelectedArray = orderSelectedArray.filter((order) => order !== saveObjectId);
      } else {
        console.log('Emlem');
        orderSelectedArray.push(saveObjectId);
      }
    } else {
      orderSelectedArray.push(saveObjectId);
    }

    setOrderNumber(orderSelectedArray.length);
  };

  const handleCloseAllModals = () => {
    setAddressModalShow(false);
    setOrderDetailsModalShow(false);
    setShow(false);
  };

  const handleAllchecked = (event: ChangeEvent<HTMLInputElement>): void => {
    setSeletAllOrder(event.target.checked);
    setOrderNumber(OrderData.length);
  };

  return (
    <div className={`${tableValue ? 'table-order-responsive' : 'table-with-open-sidebar'} table-responsive`}>
      <table  className="table order-table mb-0">
        <thead className="order-table-head">
          <tr>
            <th>
              <label className="select-all-checkbox">
                <input onChange={handleAllchecked} type="checkbox" />
                <span className="checkmark"></span>
              </label>
            </th>
            <th>Img</th>
            <th className="order-th-none">
              <span className="mr-2"> {t('OrderDetails.Sale')} </span> <UpdownIcon />
            </th>
            <th className="order-th-none">
              <span className="mr-2"> {t('OrderTable.Source')} </span> <UpdownIcon />
            </th>
            <th className="order-th-none">
              <span className="mr-2"> {t('OrderTable.Title')} </span> <UpdownIcon />
            </th>
            <th className="order-th-none">
              <span className="mr-2"> {t('OrderTable.QTY')} </span> <UpdownIcon />
            </th>
            <th className="order-th-none">
              <span className="mr-2"> {t('OrderDetails.Sold')} </span> <UpdownIcon />
            </th>
            <th className="order-th-none">
              <span className="mr-2"> {t('OrderTable.Cost')} </span> <UpdownIcon />
            </th>
            <th className="order-th-none">
              <span className="mr-2"> {t('OrderDetails.Fees')} </span> <UpdownIcon />
            </th>
            <th>
              <span className="mr-2"> {t('OrderDetails.Profit')} </span> <UpdownIcon />
            </th>
            <th className="order-th-none">
              <span className="mr-2"> {t('OrderDetails.Margin')} </span> <UpdownIcon />
            </th>
            <th className="order-th-none">
              <span className="mr-2"> {t('OrderTable.OrderedOn')} </span> <UpdownIcon />
            </th>
            <th className="d-flex justify-content-center justify-content-sm-start">
              <span className="mr-2"> {t('OrderTable.State')} </span> <UpdownIcon />
            </th>
            <th>
              <span className="mr-2"> &nbsp; </span>
            </th>
          </tr>
        </thead>

        {OrderData.map((obj) => {
          return (
            <tbody className="order-table-body" key={obj.id}>
              <tr className="cursor-pointer">
                <td onClick={() => setSaveObjectId(obj.id)}>
                  <label className="select-all-checkbox">
                    <input type="checkbox" onChange={handleChange} />
                    <span className="checkmark"></span>
                  </label>
                </td>
                <td onClick={() => setShow(true)}>
                  <img src={obj.img} alt="" />
                </td>
                <td className="obj-sale-body order-td-none" onClick={() => setShow(true)}>
                  {obj.sale}
                </td>
                <td className="obj-sale-body order-td-none" onClick={() => setShow(true)}>
                  {obj.source}
                </td>
                <td className="obj-sale-title order-td-none" onClick={() => setShow(true)}>
                  {obj.title}
                </td>
                <td className="obj-sale-qty order-td-none" onClick={() => setShow(true)}>
                  {obj.qty}
                </td>
                <td className="obj-sale-qty order-td-none" onClick={() => setShow(true)}>
                  {obj.sold}
                </td>
                <td className="obj-sale-cost  order-td-none" onClick={() => setShow(true)}>
                  {obj.cost}
                </td>
                <td className="obj-sale-qty  order-td-none" onClick={() => setShow(true)}>
                  {obj.fees}
                </td>
                <td className="obj-profit-text " onClick={() => setShow(true)}>
                  {obj.profit}
                </td>
                <td className="obj-sale-cost order-td-none" onClick={() => setShow(true)}>
                  {obj.margin}
                </td>
                <td className="obj-sale-qty  order-td-none" onClick={() => setShow(true)}>
                  {obj.orderOn}
                </td>
                <td>
                  <button
                    onClick={() => (obj.state === 'AO Disabled' ? setAoDisabledModal(true) : setShow(true))}
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
                        <span onClick={() => setShow(true)}>
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
            </tbody>
          );
        })}
      </table>
      <OrderStateModal AoDisabledModal={AoDisabledModal} setAoDisabledModal={setAoDisabledModal} />
      <OrderStateProgressModal
        addressModalShow={addressModalShow}
        setAddressModalShow={setAddressModalShow}
        setOrderDetailsModalShow={setOrderDetailsModalShow}
        orderDetailsModalShow={orderDetailsModalShow}
        orderProgress={orderProgress}
        show={show}
        setShow={setShow}
        handleCloseAllModals={handleCloseAllModals}
      />

      <OrderDetailsModal
        setOrderDetailsModalShow={setOrderDetailsModalShow}
        orderDetailsModalShow={orderDetailsModalShow}
        addressModalShow={addressModalShow}
        setAddressModalShow={setAddressModalShow}
        handleCloseAllModals={handleCloseAllModals}
        setShow={setShow}
      />

      <Pagination />
    </div>
  );
};

export default OrdersTable;
