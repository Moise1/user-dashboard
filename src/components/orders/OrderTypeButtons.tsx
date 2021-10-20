import React from 'react';
import { ProcessOrderIcon, HandStopOrderIcon, DustbinDeleteOrderIcon, DispatchedOrderIcon } from '../common/Icons';

const OrderTypeButtons = () => {
  return (
    <>
      <div className="d-flex flex-xl-row flex-column ">
        <div className=" d-flex   justify-content-between">
          <button className="btn process-5-order-btn">
            <ProcessOrderIcon />
            <span className="ml-2">Process 5 Orders</span>
          </button>
          <button className="btn stop-5-order-btn  mx-sm-3">
            <HandStopOrderIcon />
            <span className="ml-2"> Stop 5 Orders</span>
          </button>
        </div>

        <div className="d-flex  mt-xl-0 mt-4 justify-content-between ">
          <button className="btn delete-5-order-btn">
            <DustbinDeleteOrderIcon />
            <span className="ml-2">Delete 5 Orders</span>
          </button>
          <button className="btn mark-dispatch-btn  mx-sm-3">
            <DispatchedOrderIcon />+<span className="ml-2">Mark as dispatched</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderTypeButtons;
