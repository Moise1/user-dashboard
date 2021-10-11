import React from 'react';
import { UpdonwIcon } from '../common/Icons';
import OrderData from '../common/OrderData';
import ErrorIcon from '../../assets/erroricon.svg';
import InProgressIcon from '../../assets/progressicon.svg';
import PasuedIcon from '../../assets/pasuedicon.svg';
import DispatchIcon from '../../assets/dispatchedicon.svg';

interface props {
  tableValue: boolean;
}

function OrderTable(myProps: props) {
  const { tableValue } = myProps;
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
                <td className="">
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
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default OrderTable;
