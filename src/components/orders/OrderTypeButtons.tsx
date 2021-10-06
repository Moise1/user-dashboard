import React from 'react';
import { ProcessOrderIcon, HandStopOrderIcon, DustbinDeleteOrderIcon, DispatchedOrderIcon } from '../common/Icons';

const OrderTypeButtons = () => {
  return (
    <>
      <div className="d-flex">
        <button className="btn process-5-order-btn">
          <ProcessOrderIcon />
          Process 5 Orders
        </button>
        <button className="btn stop-5-order-btn mx-3">
          <HandStopOrderIcon />
          Stop 5 Orders
        </button>
        <button className="btn delete-5-order-btn">
          <DustbinDeleteOrderIcon />
          Delete 5 Orders
        </button>
        <button className="btn mark-dispatch-btn mx-3">
          <DispatchedOrderIcon />
          Mark as dispatched
        </button>
      </div>
    </>
  );
};

export default OrderTypeButtons;
