import React from 'react';
import { UpdonwIcon } from '../common/Icons';
import OrderData from './OrderData';

function OrderTable() {
  return (
    <div className="table-responsive">
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
                <td className="obj-sale-cost">{obj.cost}</td>
                <td className="obj-sale-qty">{obj.fees}</td>
                <td className="obj-profit-text">{obj.profit}</td>
                <td className="obj-sale-cost">{obj.margin}</td>
                <td className="obj-sale-qty">{obj.orderOn}</td>
                <td>{obj.state}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default OrderTable;
