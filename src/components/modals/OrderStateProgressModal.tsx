import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AoIconHead, RoundCircleCycleIcon } from '../common/Icons';

const OrderStateProgressModal = () => {
  const [show, setShow] = useState(false);

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
                <div className="col-6">
                  <div className="d-flex justify-content-between ">
                    <span>HISTORY</span>
                    <span>view full log</span>{' '}
                  </div>

                  <div className="time-line-here">
                    <div className="d-flex">
                      <span className="d-flex flex-column align-items-center">
                        <span>
                          <RoundCircleCycleIcon />
                        </span>

                        <span className="h-blue-line"></span>
                      </span>

                      <div className="order-step-heading d-flex flex-column">
                        <h4>Start order</h4>
                        <p>Sep 1, 2021 4:43 pm</p>
                        <span>Order was selected for purchase</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6"></div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default OrderStateProgressModal;
