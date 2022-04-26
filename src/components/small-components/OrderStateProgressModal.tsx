import { Modal, ProgressBar } from 'react-bootstrap';
import {
  AoIconHead,
  CrossModalIcon,
  // CheckIcon,
  // TrashIcon,
  LastStepOrderIcon,
  HandStopOrderIcon,
  OrderCheckoutIcon,
  OrderProcessRoundedIcon,
  RoundCircleCycleIcon,
  LeftBackArrowIcon,
  ProcessOrderIcon
} from '../common/Icons';
import amazonOrder from '../../assets/amazon-order-ss.png';
import { t } from '../../utils/transShim';
import '../../sass/order-state-modal.scss';
import { Button } from 'antd';
interface Props {
  orderProgress: number;
  show: boolean;
  handleClose: () => void;
  // setShow: (value: boolean) => void;
  // orderDetailsModalShow: boolean;
  // setOrderDetailsModalShow: (value: boolean) => void;
  // handleCloseAllModals: () => void;
}
const OrderStateProgressModal = (props: Props) => {
  const { show, orderProgress, handleClose } = props;
  // const { show, setShow, orderProgress, setOrderDetailsModalShow } = props;
  const now = 60;
  return (
    <>
      <div className="order-state-progress-modal">
        <Modal className="modal-page" show={show} onHide={handleClose} size="xl" centered dialogClassName="modal-90w">
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              <div className="flex-sm-row order-state-header">
                <h1 className="modal-title">{t('OrderDetails.OrderState')}</h1>
                <button className="autoordering-state">
                  <AoIconHead />
                  {/* <span>{t('OrderDetails.AOEnabled')}</span> */}
                  <span>Process</span>
                </button>
                <span className="close-modal-icon" onClick={handleClose}>
                  <CrossModalIcon />
                </span>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="order-state-body">
            <div className="order-state-body-container flex-lg-row my-4">
              <div className="col-12 col-lg-5">
                <div className="d-flex justify-content-between pb-3">
                  <span className="history-text"> {t('OrderDetails.HISTORY')}</span>
                  <a href="/" className="view-full-log">
                    {t('OrderDetails.viewFullLog')}
                  </a>{' '}
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
                <div className="img-order-container">
                  <img className="img-order" src={amazonOrder} alt="amazonOrder" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 d-flex flex-column-reverse flex-lg-row justify-content-between ">
                <div className="row">
                  <div className="go-back-details-container col">
                    <div
                      onClick={() => {
                        // setOrderDetailsModalShow(true);
                        // setShow(false);
                      }}
                      className="go-back-details"
                    >
                      <span> {t('OrderDetails.OrderDetails')}</span>
                    </div>
                    <LeftBackArrowIcon />
                  </div>
                </div>
                <div className="modal-buttons-block">
                  <div className="modal-button-row">
                    <Button className="process-btn action-btn">
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
                    </Button>
                  </div>

                  <div className="modal-button-row-mt5">
                    <Button className="process-btn action-btn">
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
                    </Button>
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
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};
export default OrderStateProgressModal;
