import React from 'react';
import SearchWithButton from '../common/SearchWithButton';
import OrderTable from './OrderTable';
import OrderTypeButtons from './OrderTypeButtons';

const Orders = () => {
  return (
    <>
      <div className="d-flex flex-column w-100 p-3">
        <SearchWithButton />
        <div className="orders-table-main">
          <OrderTypeButtons />
        </div>
        <OrderTable />
      </div>
    </>
  );
};

export default Orders;
