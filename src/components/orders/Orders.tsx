import React from 'react';
import SearchWithButton from '../common/SearchWithButton';
import OrderTypeButtons from './OrderTypeButtons';

const Orders = () => {
  return (
    <>
      <div className="d-flex flex-column w-100 p-3">
        <SearchWithButton />
        <div className="orders-table-main">
          <OrderTypeButtons />
        </div>
      </div>
    </>
  );
};

export default Orders;
