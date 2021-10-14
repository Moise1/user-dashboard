import React, { useState } from 'react';
import {
  UpdonwIcon,
  DustbinDeleteOrderIcon,
  DispatchedOrderIcon,
  HandStopOrderIcon,
  ProcessOrderIcon
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

// import { useState } from 'react';
interface props {
  tableValue: boolean;
}

const OrderTable = (myProps: props) => {
  const { tableValue } = myProps;
  const [AoDisabledModal, setAoDisabledModal] = useState(false);
  const [orderProgress, setOrderProgress] = useState(2);
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
            <th>
              <span className="mr-2"> Sale </span> <UpdonwIcon />{' '}
            </th>
            <th>
              <span className="mr-2"> Source </span> <UpdonwIcon />
            </th>
            <th>
              <span className="mr-2"> Title </span> <UpdonwIcon />
            </th>
            <th>
              <span className="mr-2"> QTY </span> <UpdonwIcon />
            </th>
            <th>
              <span className="mr-2"> Sold </span> <UpdonwIcon />
            </th>
            <th>
              <span className="mr-2"> Cost </span> <UpdonwIcon />
            </th>
            <th>
              <span className="mr-2"> Fees </span> <UpdonwIcon />
            </th>
            <th>
              <span className="mr-2"> Profit </span> <UpdonwIcon />
            </th>
            <th>
              <span className="mr-2"> Margin </span> <UpdonwIcon />
            </th>
            <th>
              <span className="mr-2"> Ordered on </span> <UpdonwIcon />
            </th>
            <th>
              <span className="mr-2"> State </span> <UpdonwIcon />
            </th>
          </tr>
        </thead>

        {OrderData.map((obj) => {
          return (
            <tbody className="order-table-body" key={obj.id}>
              <tr>
                <td>
                  <img src={obj.img} alt="" />
                </td>
                <td className="obj-sale-body">{obj.sale}</td>
                <td className="obj-sale-body">{obj.source}</td>
                <td className="obj-sale-title">{obj.title}</td>
                <td className="obj-sale-qty">{obj.qty}</td>
                <td className="obj-sale-qty">{obj.sold}</td>
                <td className="obj-sale-cost  ">{obj.cost}</td>
                <td className="obj-sale-qty  ">{obj.fees}</td>
                <td className="obj-profit-text  ">{obj.profit}</td>
                <td className="obj-sale-cost  ">{obj.margin}</td>
                <td className="obj-sale-qty   ">{obj.orderOn}</td>
                <td className="">
                  <button
                    onClick={() => (obj.state === 'AO Disabled' ? setAoDisabledModal(true) : null)}
                    className={`btn btn-state-style ${obj.state === 'Error' ? 'bg-dark-pink' : ''} ${
                      obj.state === 'In progress' ? 'bg-primary' : ''
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
                  </button>{' '}
                </td>
                <td className="order-three-dots-dropdown">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      <svg
                        id="Group_44"
                        data-name="Group 44"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path id="Path_34" data-name="Path 34" d="M0,0H24V24H0Z" fill="none" />
                        <circle
                          id="Ellipse_12"
                          data-name="Ellipse 12"
                          cx="1"
                          cy="1"
                          r="1"
                          transform="translate(11 11)"
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <circle
                          id="Ellipse_13"
                          data-name="Ellipse 13"
                          cx="1"
                          cy="1"
                          r="1"
                          transform="translate(11 18)"
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <circle
                          id="Ellipse_14"
                          data-name="Ellipse 14"
                          cx="1"
                          cy="1"
                          r="1"
                          transform="translate(11 4)"
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <ProcessOrderIcon />
                        <span className="ml-2">Process order</span>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        {' '}
                        <span onClick={() => setShow(true)}>
                          <HandStopOrderIcon />
                          <span className="ml-2">Stop order</span>
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        {' '}
                        <DispatchedOrderIcon />
                        <span className="ml-2">Mark as dispatched</span>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        {' '}
                        <DustbinDeleteOrderIcon />
                        <span className="ml-2">Delete order</span>
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
    </div>
  );
};

export default OrderTable;
