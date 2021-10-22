import React, { useState } from 'react';
import SearchWithButton from '../common/SearchWithButton';
import OrderTable from './OrderTable';
import OrderTypeButtons from './OrderTypeButtons';
import './Order.css';
interface props {
  staticValue: boolean;
}

const Orders = (myProps: props) => {
  const [orderNumber, setOrderNumber] = useState(0);
  console.log(orderNumber);
  const { staticValue } = myProps;
  return (
    <>
      <div className="d-flex flex-column w-100 p-0 p-sm-3 ant-layout">
        <SearchWithButton />
        <div className="orders-table-main">
          <OrderTypeButtons orderNumber={orderNumber} />
        </div>
        <OrderTable tableValue={staticValue} setOrderNumber={setOrderNumber} />
      </div>
    </>
  );
};

export default Orders;
