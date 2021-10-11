import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { AoIconHead } from '../common/Icons';

const OrderStateModal = () => {
  const [ModalThird, setModalThird] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setModalThird(true)}>
        Custom Width Modal
      </Button>

      <Modal
        show={ModalThird}
        onHide={() => setModalThird(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            <div className="d-flex flex-sm-row  flex-column  ">
              <h1 className="head-part-one mr-5">Order State Progress</h1>
              <button className="head-part-second align-items-center   d-flex ">
                <AoIconHead />

                <span className="px-2 ">AO Enabled</span>
              </button>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p></p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OrderStateModal;
