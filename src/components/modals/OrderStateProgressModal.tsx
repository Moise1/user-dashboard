import React, { useState } from 'react';
import { Button, Modal, ProgressBar } from 'react-bootstrap';
import {
  AoIconHead,
  DispatchedOrderIcon,
  DustbinDeleteOrderIcon,
  HandStopOrderIcon,
  ProcessOrderIcon,
  RoundCircleCycleIcon
} from '../common/Icons';
import amazonOrder from '../../assets/amazon-order-ss.png';

const OrderStateProgressModal = () => {
  const [show, setShow] = useState(false);
  const now = 60;
  return (
    <>
      <div className="order-state-progress-modal">
        <Button variant="primary" onClick={() => setShow(true)}>
          Custom Width Modal
        </Button>

        <Modal
          className="modal-page"
          show={show}
          onHide={() => setShow(false)}
          size="xl"
          centered
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Body>
            <div className="p-3">
              <div className="d-flex ">
                <h2 className="head-part-one mr-5">Order Details</h2>
                <button className="btn ao-enabled-button">
                  <span>
                    <AoIconHead />
                  </span>
                  <span className="px-3">AO Enabled</span>
                </button>
              </div>

              <div className="row">
                <div className="col-5">
                  <div className="d-flex justify-content-between ">
                    <span>HISTORY</span>
                    <span>view full log</span>{' '}
                  </div>

                  <div className="time-line-here">
                    {/* START ORDER  */}
                    <div className="d-flex">
                      <span className="d-flex flex-column align-items-center">
                        <span>
                          <RoundCircleCycleIcon />
                        </span>

                        <span className="h-blue-line"></span>
                      </span>

                      <div className="order-step-heading d-flex flex-column mt-3 ml-3">
                        <h4 className="mb-1">Start order</h4>
                        <p className="mb-0">Sep 1, 2021 4:43 pm</p>
                        <span>Order was selected for purchase</span>
                      </div>
                    </div>
                    {/* CHECKOUT  */}
                    <div className="d-flex">
                      <span className="d-flex flex-column align-items-center">
                        <span>
                          <RoundCircleCycleIcon />
                        </span>

                        <span className="h-blue-line"></span>
                      </span>

                      <div className="order-step-heading d-flex flex-column mt-3 ml-3">
                        <h4 className="mb-1"> Checkout</h4>
                        <p className="mb-0">Sep 1, 2021 4:43 pm</p>
                        <span>Order was selected for purchase</span>
                      </div>
                    </div>
                    {/* LAST STEP  */}
                    <div className="d-flex">
                      <span className="d-flex flex-column align-items-center">
                        <span>
                          <RoundCircleCycleIcon />
                        </span>
                      </span>

                      <div className="order-step-heading d-flex flex-column mt-3 ml-3">
                        <h4 className="mb-1">Last steps</h4>
                        <p className="mb-0">Sep 1, 2021 4:43 pm</p>
                      </div>
                    </div>

                    <p>Progress: in checkout</p>
                    <ProgressBar now={now} label={`${now}%`} />
                  </div>
                </div>

                <div className="col-7">
                  <div className="p-4 bg-InputLight br-10">
                    <img className="w-100" src={amazonOrder} alt="amazonOrder" />
                  </div>
                  <div className="d-flex flex-column">
                    <div className=" d-flex">
                      <button className="btn process-5-order-btn">
                        <ProcessOrderIcon />
                        <span className="ml-2">Process Orders</span>
                      </button>
                      <button className="btn stop-5-order-btn">
                        <HandStopOrderIcon />
                        <span className="ml-2"> Stop Orders</span>
                      </button>
                    </div>

                    <div className="d-flex justify-conetent-between">
                      <button className="btn delete-5-order-btn">
                        <DustbinDeleteOrderIcon />
                        <span className="ml-2">Delete Orders</span>
                      </button>
                      <button className="btn mark-dispatch-btn">
                        <DispatchedOrderIcon />
                        <span className="ml-2">Mark as dispatched</span>
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
