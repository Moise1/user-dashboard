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
  RoundCircleCycleIcon
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
  console.log(orderProgress);

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
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Body className="position-relative">
            <div className="p-0 p-lg-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex flex-column flex-lg-row">
                  <h2 className="head-part-one mr-5"> {t('OrderDetails.OrderStateProcess')}</h2>
                  <button className="btn ao-enabled-button">
                    <span>
                      <AoIconHead />
                    </span>
                    <span className="px-3"> {t('OrderDetails.AOEnabled')}</span>
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
                <div className="col-12 d-flex flex-column flex-lg-row justify-content-between ">
                  <span className="d-flex mt-4">
                    <div
                      className="order-details-model-btnn order-details-back-text cursor-pointer"
                      onClick={() => {
                        setOrderDetailsModalShow(true);
                        setShow(false);
                      }}
                    >
                      Order Details
                    </div>
                    <span>
                      <svg
                        id="Group_345"
                        data-name="Group 345"
                        xmlns="http://www.w3.org/2000/svg"
                        width="30.73"
                        height="30.73"
                        viewBox="0 0 30.73 30.73"
                      >
                        <path id="Path_70" data-name="Path 70" d="M30.73,0H0V30.73H30.73Z" fill="none" />
                        <path
                          id="Path_71"
                          data-name="Path 71"
                          d="M9,6l7.683,7.683L9,21.365"
                          transform="translate(2.524 1.683)"
                          fill="none"
                          stroke="#262e80"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                        />
                      </svg>
                    </span>{' '}
                  </span>
                  <div className="d-flex align-items-end flex-column">
                    <div className="d-flex flex-column flex-lg-row width-100">
                      <button className=" disabled-btn btn process-5-order-btn mr-0 mr-lg-3">
                        <ProcessOrderIcon />
                        <span className="ml-2">{t('OrderButtons.ProcessOrders')}</span>
                      </button>
                      <button className="btn stop-5-order-btn mt-3 mt-lg-0">
                        <HandStopOrderIcon />
                        <span className="ml-2"> {t('OrderButtons.StopOrders')} </span>
                      </button>
                    </div>

                    <div className="d-flex flex-column flex-lg-row justify-content-between mt-3 width-100">
                      <button className="btn delete-5-order-btn mr-0 mr-lg-3">
                        <DustbinDeleteOrderIcon />
                        <span className="ml-2"> {t('OrderButtons.DeleteOrders')}</span>
                      </button>
                      <button className=" disabled-btn btn mark-dispatch-btn mt-3 mt-lg-0">
                        <DispatchedOrderIcon />
                        <span className="ml-2"> {t('OrderButtons.MarkAsDispatched')}</span>
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
