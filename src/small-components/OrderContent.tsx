import { ProgressBar } from 'react-bootstrap';
import { Spin } from 'antd';
import { OrderData } from 'src/redux/orders/orderSlice';
import {
  // AoIconHead,
  // CheckIcon,
  // TrashIcon,
  LastStepOrderIcon,
  OrderCheckoutIcon,
  OrderProcessRoundedIcon,
  RoundCircleCycleIcon,
  LeftBackArrowIcon
} from '../components/common/Icons';
import { useState } from 'react';
import { ProcessOrderIcon, HandStopOrderIcon, TrashIcon, CheckIcon } from '../components/common/Icons';
import { ConfirmBtn, WarningBtn, DangerBtn, SuccessBtn } from './ActionBtns';
import { useAppDispatch, useAppSelector } from '../custom-hooks/reduxCustomHooks';
import { processOrders } from '../redux/orders/orderThunk';
import { manuallyDispatch } from '../redux/orders/orderThunk';
import { stopOrder } from '../redux/orders/orderThunk';
import amazonOrder from '../../src/assets/amazon-order-ss.png';
import { t } from '../utils/transShim';
import '../sass/order-state-modal.scss';
import { loadProgressOfOrder } from '../redux/orders/orderThunk';
import { CrossModalIcon } from '../components/common/Icons';
import { useEffect } from 'react';
// import { AutoOrderingState } from '../orders/OrderStatus';

// import { Button } from 'antd';
interface Props {
  orderProgress: number;
  data: { [key: string]: OrderData };
  // show: boolean;
  // handleClose: () => void;
  OrderDetailsModalOpen: () => void;
  // setShow: (value: boolean) => void;
  // orderDetailsModalShow: boolean;
  // setOrderDetailsModalShow: (value: boolean) => void;
  // handleCloseAllModals: () => void;
  // }
}

export const OrderContent = (props: Props) => {

  const { orderProgress, data, OrderDetailsModalOpen } = props;
  const {id} = data;
  console.log('The data id is',data.id);
  const [orderNumber] = useState(id);
  // const [iddd] = useState(445378);
  const orderStatus = useAppSelector((state) => state.orderProgress.orderProgress.states);
  const [orderProgressStatus, setOrderProgressStatus] = useState([]);
  const dispatch = useAppDispatch();

  const handleProcessOrders = () => {
    dispatch(processOrders(orderNumber));
  };
  const handleManuallyDispatch = () => {
    dispatch(manuallyDispatch(orderNumber));
  };
  const handleStopOrder = () => {
    dispatch(stopOrder(orderNumber));
  };
  const { loading } = useAppSelector((state) => state.orderProgress);

  const now = 60;

  useEffect(() => {
    // dispatch(loadProgressOfOrder(iddd));
    dispatch(loadProgressOfOrder(id));
    setOrderProgressStatus(orderStatus);
  }, []);

  console.log('The order progress status is', orderProgressStatus);

  //To check status, working on it -Suleman Ahmad-
  // let statusText: string;
  // let orderProgressBar = 1;
  // orderProgressStatus.map((curr: any) => {
  //   if (curr.status == AutoOrderingState.AutoorderingDisabled) {
  //     orderProgressBar = 0;
  //     statusText = 'Paused';
  //   } else if (curr.status == AutoOrderingState.ManuallyDispatched) {
  //     orderProgressBar = 0;
  //     statusText = 'Manually dispatched';
  //   } else if (curr.status == AutoOrderingState.AutoorderingPrepared) {
  //     orderProgressBar = 1;
  //     statusText = 'Waiting to start';
  //   } else if (
  //     (curr.status > AutoOrderingState.AutoorderingPrepared && curr.status < AutoOrderingState.CompletedAutoOrder) ||
  //     curr.status == AutoOrderingState.TemporaryError
  //   ) {
  //     //Processing
  //     orderProgressBar = 2;
  //     statusText = 'Checking out';
  //   } else if (curr.status >= AutoOrderingState.CompletedAutoOrder && curr.status < AutoOrderingState.Completed) {
  //     //LastSteps
  //     orderProgressBar = 3;
  //     statusText = 'Last steps';
  //   } else if (curr.status >= AutoOrderingState.Completed && curr.status < AutoOrderingState.TemporaryError) {
  //     //Completed
  //     orderProgressBar = 4;
  //     statusText = 'Completed';
  //   } /*if (lastState.status > AutoOrderingState.TemporaryError)*/ else {
  //     //Error
  //     orderProgressBar = 0;
  //     statusText = 'Error';
  //   }
  //   const percent = orderProgress * 25;
  //   console.log(orderProgressBar, statusText, percent);
  // });

  return (
    <div className="order-state-progress-modal">
      <div className="flex-sm-row order-state-header">
        <h1 className="modal-title">{t('OrderDetails.OrderState')}</h1>
        {/* <button className="autoordering-state"> //This button for future use on the order modal content
          <AoIconHead />
         <span>{t('OrderDetails.AOEnabled')}</span> 
          <span>Process</span>
        </button> */}
        <span
          className="close-modal-icon"
          onClick={() => {
            // setOrderDetailsModalShow(false);
          }}
        >
          <CrossModalIcon />
        </span>
      </div>
      <div className="order-state-body-container flex-lg-row my-4">
        {loading ? (
          <Spin />
        ) : (
          <>
            <div className="col-12 col-lg-5">
              <div className="d-flex justify-content-between pb-3">
                <span className="history-text"> {t('OrderDetails.HISTORY')}</span>
                {/* <a href="/" className="view-full-log">
                {t('OrderDetails.viewFullLog')}
              </a>{' '} */}
              </div>
              <div className="time-line-here">
                {/* START ORDER  */}
                <div className="d-flex">
                  <span className="d-flex flex-column align-items-center">
                    <span className={`${orderProgress <= 3 ? 'start-order-active-svg' : ''}`}>
                      <RoundCircleCycleIcon />
                    </span>
                    <span className={`${orderProgress <= 3 ? 'h-blue-line' : 'disabled-line'}`}></span>
                  </span>
                  <div className="order-step-heading d-flex flex-column mt-2 ml-3">
                    <h4 className="mb-1">
                      {t('OrderDetails.StartOrder')}
                      {orderProgress === 1 ? (
                        <span className="ml-2">
                          <OrderProcessRoundedIcon />
                        </span>
                      ) : (
                        ''
                      )}
                    </h4>
                    <p className="mb-0">{data.date}</p>
                    <span>Order was selected for purchase</span>
                  </div>
                </div>
                {/* CHECKOUT  */}
                <div className="d-flex">
                  <span className="d-flex flex-column align-items-center">
                    <span className={`${orderProgress > 1 && orderProgress <= 3 ? 'order-checkout-icon' : ''}`}>
                      <OrderCheckoutIcon />
                    </span>
                    <span
                      className={`${orderProgress > 1 && orderProgress <= 3 ? 'h-blue-line' : 'disabled-line'}`}
                    ></span>
                  </span>
                  <div className="order-step-heading d-flex flex-column mt-2 ml-3">
                    <h4 className="mb-1">
                      {' '}
                      Checkout{' '}
                      {orderProgress === 2 ? (
                        <span className="ml-2">
                          <OrderProcessRoundedIcon />
                        </span>
                      ) : (
                        ''
                      )}
                    </h4>
                    <p className="mb-0">{data.date}</p>
                    <span>Order was selected for purchase</span>
                  </div>
                </div>
                {/* LAST STEP  */}
                <div className="d-flex">
                  <span className="d-flex flex-column align-items-center">
                    <span className={`${orderProgress === 3 ? 'last-step-order-icon' : ''}`}>
                      <LastStepOrderIcon />
                    </span>
                  </span>
                  <div className="order-step-heading d-flex flex-column mt-2 ml-3">
                    <h4 className="mb-1">
                      Last steps
                      {orderProgress === 3 ? (
                        <span className="ml-2">
                          <OrderProcessRoundedIcon />
                        </span>
                      ) : (
                        ''
                      )}
                    </h4>
                    <p className="mb-0">{data.date}</p>
                  </div>
                </div>
                <div className="progress-order mt-4 mb-3 mb-lg-0">
                  <h2 className="mb-0">
                    Progress: <h2 className="fw-400">in checkout</h2>{' '}
                  </h2>
                  <ProgressBar now={now} label={`${now}%`} />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-7" style={{ backgroundColor: '#f2f8ff' }}>
              <div className="img-order-container">
                <img className="img-order" src={amazonOrder} alt="amazonOrder" />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="row">
        <div className="col-12 d-flex flex-column-reverse flex-lg-row justify-content-between ">
          <div className="row">
            <div className="go-back-details-container col">
              <div onClick={OrderDetailsModalOpen} className="go-back-details">
                <span> {t('OrderDetails.OrderDetails')}</span>
              </div>
              <LeftBackArrowIcon />
            </div>
          </div>

          {/* Buttons to stop,process,dispatch,delete an order */}
          <div className="modal-buttons-block">
            <div className="modal-button-row-mt5">
              {/* <Button className="process-btn action-btn">
                  <ProcessOrderIcon />
                  <div className="btn-text">
                    <span>{t('OrderTable.Process')}</span>
                    <span>Orders</span>
                  </div>
                </Button>
                <Button className="stop-btn action-btn">
                  <HandStopOrderIcon />
                  <div className="btn-tetx">
                    <span>{t('OrderTable.Stop')}</span>
                    <span>Orders</span>
                  </div>
                </Button> */}
              <WarningBtn handleConfirm={handleManuallyDispatch}>
                <HandStopOrderIcon />
                <span>{t('OrderTable.Stop')} order</span>
              </WarningBtn>
              <ConfirmBtn handleConfirm={handleProcessOrders}>
                <ProcessOrderIcon />
                <span>{t('OrderTable.Process')} order</span>
              </ConfirmBtn>
            </div>

            <div className="modal-button-row-mt5 ">
              {/* <Button className="process-btn action-btn">
                  <ProcessOrderIcon />
                  <div className="btn-text">
                    <span>{t('OrderTable.Process')}</span>
                    <span>Orders</span>
                  </div>
                </Button>
                <Button className="stop-btn action-btn">
                  <HandStopOrderIcon />
                  <div className="btn-tetx">
                    <span>{t('OrderTable.Stop')}</span>
                    <span>Orders</span>
                  </div>
                </Button> */}
              <SuccessBtn handleConfirm={handleStopOrder}>
                <CheckIcon />
                <span>{t('OrderButtons.MarkAsDispatched')}</span>
              </SuccessBtn>
              <DangerBtn className="mr-3">
                <TrashIcon />
                <span> {t('OrderTable.Delete')} order</span>
              </DangerBtn>
            </div>
            {/* <div className="d-flex delete-btn-parent  justify-content-around  mt-lg-2 align-items-center">
                     <button className="btn delete-order-modal-btn-style mr-0 mr-lg-3">
                        <TrashIcon />
                        <span className="ml-1 ml-lg-2"> {t('OrderButtons.DeleteOrders')}</span>
                      </button>
                      <button className=" btn disabled-btn mark-dispatch-modal-btn-style">
                        <CheckIcon />
                        <span className="ml-1 ml-lg-2"> {t('OrderButtons.MarkAsDispatched')}</span>
                      </button>
                    </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
