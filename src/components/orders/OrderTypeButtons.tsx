import React from 'react';
import { ProcessOrderIcon, HandStopOrderIcon, DustbinDeleteOrderIcon, DispatchedOrderIcon } from '../common/Icons';
import { t } from '../../global/transShim';

interface props {
  orderNumber: number;
}

const OrderTypeButtons = (myProps: props) => {
  const { orderNumber } = myProps;

  return (
    <>
      <div className="d-flex">
        <div className=" d-flex   justify-content-between">
          <button className="btn process-5-order-btn">
            <ProcessOrderIcon />
            <span className="ml-1 ml-sm-2">
              {' '}
              Process {orderNumber > 0 ? orderNumber : ''}
              {/* {t('OrderButtons.Process5Orders')} */}
            </span>
            <span className="d-none d-md-block">&nbsp;Orders</span>
          </button>
          <button className="btn stop-5-order-btn mx-1 mx-sm-3">
            <HandStopOrderIcon />
            <span className="ml-1 ml-sm-2">
              Stop {orderNumber > 0 ? orderNumber : ''}
              {/* {t('OrderButtons.Stop5Orders')}  */}
            </span>
            <span className="d-none d-md-block">&nbsp;Orders</span>
          </button>
        </div>

        <div className="d-flex  justify-content-between ">
          <button className="btn delete-5-order-btn">
            <DustbinDeleteOrderIcon />
            <span className="ml-1 ml-sm-2">
              Delete {orderNumber > 0 ? orderNumber : ''}
              {/* {t('OrderButtons.Delete5Orders')} */}
            </span>
            <span className="d-none d-md-block">&nbsp;Orders</span>
          </button>
          <button className="btn mark-dispatch-btn mx-1  mx-sm-3">
            <DispatchedOrderIcon />
            <span className="ml-1 ml-sm-2">{t('OrderButtons.MarkAsDispatched')}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderTypeButtons;
