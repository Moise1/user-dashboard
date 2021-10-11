import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { AoIconHead, CrossModalIcon } from '../common/Icons';

const OrderStateModal = () => {
  const [ModalThird, setModalThird] = useState(false);
  return (
    <>
      <div>
        <Button variant="primary" onClick={() => setModalThird(true)}>
          Custom Width Modal
        </Button>
      </div>

      <Modal
        show={ModalThird}
        onHide={() => setModalThird(false)}
        size="xl"
        centered
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
          <div className="p-0 p-lg-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex flex-column flex-sm-row">
                <h2 className="head-part-one mr-2 mr-lg-5">Order state progress</h2>
                <button className="btn ao-disabled-button">
                  <span>
                    <AoIconHead />
                  </span>
                  <span className="px-3">AO Disabled</span>
                </button>
              </div>

              <span className="cursor-pointer cross-round-iconModal" onClick={() => setModalThird(false)}>
                <CrossModalIcon />
              </span>
            </div>

            <div className="middle-part-autoordering">
              <p>
                {' '}
                This order seems to have Auto-ordering disabled. Click the link below in order to enable Auto-ordering.
              </p>

              <button className="btn">How to enable Auto ordering</button>
            </div>

            <div className="row">
              <div className="col-12 d-flex flex-column flex-lg-row justify-content-between ">
                <span className="order-details-back-text">
                  Order details{' '}
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
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OrderStateModal;
