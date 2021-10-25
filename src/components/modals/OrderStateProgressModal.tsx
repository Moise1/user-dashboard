import React from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';
import {
  AoIconHead,
  CrossModalIcon,
  DispatchedOrderIcon,
  DustbinDeleteOrderIcon,
  HandStopOrderIcon,
  LastStepOrderIcon,
  OrderCheckoutIcon,
  OrderProcessRoundedIcon,
  ProcessOrderIcon,
  RoundCircleCycleIcon,
  LeftBackArrowIcon
} from '../common/Icons';
import amazonOrder from '../../assets/amazon-order-ss.png';
import { t } from '../../global/transShim';

interface Props {
  orderProgress: number;
  addressModalShow: boolean;
  setAddressModalShow: (value: boolean) => void;
  show: boolean;
  setShow: (value: boolean) => void;
  orderDetailsModalShow: boolean;
  setOrderDetailsModalShow: (value: boolean) => void;
  handleCloseAllModals: () => void;
}

const OrderStateProgressModal = (props: Props) => {
  const { show, setShow, orderProgress, setOrderDetailsModalShow } = props;

  const now = 60;

  return (
    <>
      <div className="order-state-progress-modal">
        <Modal
          className="modal-page"
          show={show}
          onHide={() => setShow(false)}
          size="xl"
          centered
          dialogClassName="modal-90w"
        >
          <Modal.Body className="position-relative p-2 p-lg-3">
            <div className="p-0 p-lg-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex">
                  <h2 className="head-part-one mr-2 mr-lg-5"> {t('OrderDetails.OrderStateProcess')}</h2>
                  <button className="btn ao-enabled-button">
                    <span>
                      <AoIconHead />
                    </span>
                    <span className="px-2 px-lg-3"> {t('OrderDetails.AOEnabled')}</span>
                  </button>
                </div>

                <span className="cursor-pointer cross-round-iconModal" onClick={() => setShow(false)}>
                  <CrossModalIcon />
                </span>
              </div>

              <div className="row flex-column flex-lg-row my-4">
                <div className="col-12 col-lg-5">
                  <div className="d-flex justify-content-between pb-3">
                    <span className="history-text"> {t('OrderDetails.HISTORY')}</span>
                    <span className="view-full-vlog-text">{t('OrderDetails.viewFullLog')}</span>{' '}
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
                        <p className="mb-0">Sep 1, 2021 4:43 pm</p>
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
                        <p className="mb-0">Sep 1, 2021 4:43 pm</p>
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
                        <p className="mb-0">Sep 1, 2021 4:43 pm</p>
                      </div>
                    </div>

                    <div className="progress-order mt-4 mb-3 mb-lg-0">
                      <p className="mb-0">
                        Progress: <span className="fw-400">in checkout</span>{' '}
                      </p>
                      <ProgressBar now={now} label={`${now}%`} />
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-7">
                  <div className="p-4 bg-InputLight amazon-order-ss ml-auto br-10">
                    <img className="w-100 h-100 ml-auto" src={amazonOrder} alt="amazonOrder" />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 d-flex flex-column-reverse flex-lg-row justify-content-between ">
                  <span className="d-flex align-items-center mt-4 mb-3 mb-lg-0">
                    <div
                      className="order-details-model-btnn order-details-back-text cursor-pointer"
                      onClick={() => {
                        setOrderDetailsModalShow(true);
                        setShow(false);
                      }}
                    >
                      {t('OrderDetails.OrderDetails')}
                    </div>
                    <span className="rotate-180-arrow">
                      <LeftBackArrowIcon />
                    </span>
                  </span>
                  <div className="d-flex justify-content-between align-items-lg-end flex-lg-column">
                    <div className="d-flex w-45  justify-content-around align-items-center">
                      <button className=" disabled-btn btn process-order-btn-style mr-0 mr-lg-4">
                        <ProcessOrderIcon />
                        <span className="ml-1 ml-lg-2">{t('OrderButtons.ProcessOrders')}</span>
                      </button>
                      <button className="btn stop-order-btn-style">
                        <HandStopOrderIcon />
                        <span className="ml-1 ml-lg-2"> {t('OrderButtons.StopOrders')} </span>
                      </button>
                    </div>

                    <div className="d-flex w-55  justify-content-around  mt-lg-2 align-items-center">
                      <button className="btn delete-order-modal-btn-style mr-0 mr-lg-3">
                        <DustbinDeleteOrderIcon />
                        <span className="ml-1 ml-lg-2"> {t('OrderButtons.DeleteOrders')}</span>
                      </button>
                      <button className=" btn disabled-btn mark-dispatch-modal-btn-style">
                        <DispatchedOrderIcon />
                        <span className="ml-1 ml-lg-2"> {t('OrderButtons.MarkAsDispatched')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default OrderStateProgressModal;
