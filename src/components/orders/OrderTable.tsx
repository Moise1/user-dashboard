import React from 'react';
import { UpdonwIcon } from '../common/Icons';
import OrderData from '../common/OrderData';
import ErrorIcon from '../../assets/erroricon.svg';
import InProgressIcon from '../../assets/progressicon.svg';
import PasuedIcon from '../../assets/pasuedicon.svg';
import DispatchIcon from '../../assets/dispatchedicon.svg';
import { Dropdown } from 'react-bootstrap';
// import { useState } from 'react';
import { useHistory } from 'react-router-dom';
interface props {
  tableValue: boolean;
}

const OrderTable = (myProps: props) => {
  const history = useHistory();
  const { tableValue } = myProps;

  // const [GoToModel, setGoToModel] = useState('Stop Order');

  // const handlechangemodel = () => {

  //   setGoToModel();
  // };

  return (
    // <div className="table-responsive table-order-responsive">
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
                <td className="obj-sale-body  ">{obj.sale}</td>
                <td className="obj-sale-body  ">{obj.source}</td>
                <td className="obj-sale-title   ">{obj.title}</td>
                <td className="obj-sale-qty   ">{obj.qty}</td>
                <td className="obj-sale-qty   ">{obj.sold}</td>
                <td className="obj-sale-cost  ">{obj.cost}</td>
                <td className="obj-sale-qty  ">{obj.fees}</td>
                <td className="obj-profit-text  ">{obj.profit}</td>
                <td className="obj-sale-cost  ">{obj.margin}</td>
                <td className="obj-sale-qty   ">{obj.orderOn}</td>
                <td className="">
                  <span
                    className={`${obj.state === 'Error' ? 'bg-dark-pink' : ''} ${
                      obj.state === 'In progress' ? 'bg-primary' : ''
                    } ${obj.state === 'Dispatched' ? 'bg-color-dark-green' : ''} ${
                      obj.state === 'Paused' ? 'bg-color-light-orange' : ''
                    }  obj-state-text `}
                  >
                    {obj.state === 'Error' ? <img className="mr-2" src={ErrorIcon} alt="" /> : ''}
                    {obj.state === 'In progress' ? <img className="mr-2" src={InProgressIcon} alt="" /> : ''}
                    {obj.state === 'Dispatched' ? <img className="mr-2" src={DispatchIcon} alt="" /> : ''}
                    {obj.state === 'Paused' ? <img className="mr-2" src={PasuedIcon} alt="" /> : ''}
                    {obj.state}
                  </span>{' '}
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
                      <Dropdown.Item>Process order</Dropdown.Item>
                      <Dropdown.Item onClick={() => history.push('/progress-bar')}>GoToModel</Dropdown.Item>
                      <Dropdown.Item>Mark as dispatched</Dropdown.Item>
                      <Dropdown.Item>Delete order</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default OrderTable;
