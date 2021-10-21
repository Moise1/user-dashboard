import React, { useState } from 'react';
import {
  UpdonwIcon,
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

interface props {
  tableValue: boolean;
}

const OrderTable = (myProps: props) => {
  const { tableValue } = myProps;
  const [AoDisabledModal, setAoDisabledModal] = useState(false);
  const [orderProgress, setOrderProgress] = useState(1);
  const [show, setShow] = useState(false);

  const [addressModalShow, setAddressModalShow] = useState(false);
  const [orderDetailsModalShow, setOrderDetailsModalShow] = useState(false);

  console.log(setOrderProgress);

  const handleCloseAllModals = () => {
    setAddressModalShow(false);
    setOrderDetailsModalShow(false);
    setShow(false);
  };

  return (
    <div className={`${tableValue ? 'table-order-responsive' : 'table-with-open-sidebar'} table-responsive  `}>
      <table className="table order-table">
        <thead className="order-table-head">
          <tr>
            <th>Img</th>
            <th className="order-th-none">
              <span className="mr-2"> {t('OrderDetails.Sale')} </span> <UpdonwIcon />
            </th>
            <th className="order-th-none">
              <span className="mr-2"> {t('OrderTable.Source')} </span> <UpdonwIcon />
            </th>
            <th className="order-th-none">
              <span className="mr-2"> {t('OrderTable.Title')} </span> <UpdonwIcon />
            </th>
            <th className="order-th-none">
              <span className="mr-2"> {t('OrderTable.QTY')} </span> <UpdonwIcon />
            </th>
            <th>
              <span className="mr-2"> {t('OrderDetails.Sold')} </span> <UpdonwIcon />
            </th>
            <th>
              <span className="mr-2"> {t('OrderTable.Cost')} </span> <UpdonwIcon />
            </th>
            <th>
              <span className="mr-2"> {t('OrderDetails.Fees')} </span> <UpdonwIcon />
            </th>
            <th className="order-th-none">
              <span className="mr-2"> {t('OrderDetails.Profit')} </span> <UpdonwIcon />
            </th>
            <th>
              <span className="mr-2"> {t('OrderDetails.Margin')} </span> <UpdonwIcon />
            </th>
            <th className="order-th-none">
              <span className="mr-2"> {t('OrderTable.OrderedOn')} </span> <UpdonwIcon />
            </th>
            <th className="order-th-none">
              <span className="mr-2"> {t('OrderTable.State')} </span> <UpdonwIcon />
            </th>
            <th>
              <span className="mr-2"> &nbsp; </span>
            </th>
          </tr>
        </thead>

        {OrderData.map((obj) => {
          return (
            <tbody className="order-table-body" key={obj.id}>
              <tr>
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
                <td className="obj-sale-cost" onClick={() => setShow(true)}>
                  {obj.cost}
                </td>
                <td className="obj-sale-qty" onClick={() => setShow(true)}>
                  {obj.fees}
                </td>
                <td className="obj-profit-text order-td-none" onClick={() => setShow(true)}>
                  {obj.profit}
                </td>
                <td className="obj-sale-cost order-td-none" onClick={() => setShow(true)}>
                  {obj.margin}
                </td>
                <td className="obj-sale-qty" onClick={() => setShow(true)}>
                  {obj.orderOn}
                </td>
                <td className="order-td-none">
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
    </div>
  );
};

export default OrderTable;
