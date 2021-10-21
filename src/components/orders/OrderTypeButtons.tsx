import React from 'react';
import { ProcessOrderIcon, HandStopOrderIcon, DustbinDeleteOrderIcon, DispatchedOrderIcon } from '../common/Icons';
import { t } from '../../global/transShim';

const OrderTypeButtons = () => {
  return (
    <>
      <div className="d-flex flex-xl-row flex-column ">
        <div className=" d-flex   justify-content-between">
          <button className="btn process-5-order-btn">
            <ProcessOrderIcon />
            <span className="ml-2"> {t('OrderButtons.Process5Orders')} </span>
          </button>
          <button className="btn stop-5-order-btn  mx-sm-3">
            <HandStopOrderIcon />
            <span className="ml-2"> {t('OrderButtons.Stop5Orders')} </span>
          </button>
        </div>

        <div className="d-flex  mt-xl-0 mt-4 justify-content-between ">
          <button className="btn delete-5-order-btn">
            <DustbinDeleteOrderIcon />
            <span className="ml-2"> {t('OrderButtons.Delete5Orders')}</span>
          </button>
          <button className="btn mark-dispatch-btn  mx-sm-3">
            <DispatchedOrderIcon />
            <span className="ml-2">{t('OrderButtons.MarkAsDispatched')}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderTypeButtons;
