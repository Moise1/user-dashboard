import React from 'react';
import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { CrossModalIcon, IconEdit } from '../common/Icons';

const AddressModal = () => {
  const [modals, setModals] = useState(false);
  return (
    <div>
      <Button className="btnn-in-model" variant="primary" onClick={() => setModals(true)}>
        <span>Order State Process</span>
      </Button>

      <Modal
        className="full-model"
        show={modals}
        size="lg"
        centered
        onHide={() => setModals(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header className="modal-second-head px-2" closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            <IconEdit />
            <span className="cursor-pointer cross-round-iconModal" onClick={() => setModals(false)}>
              <CrossModalIcon />
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row p-3 p-lg-5 ">
            <div className="col-12 col-lg-5 modal-second-inputs  ">
              <h1 className="shop-address ">Shipping address</h1>
              <p className="modal-second-input-heads pt-3">Street address</p>
              <Form.Control className="modal-inputs" type="text" placeholder="" />
              <p className="modal-second-input-heads pt-3">City</p>
              <Form.Control className="modal-inputs" type="text" placeholder="" />
              <p className="modal-second-input-heads pt-3">Postal code/state</p>
              <Form.Control className="modal-inputs" type="text" placeholder="" />
            </div>
            <div className="col-12 col-lg-5 mt-4 mt-lg-0 modal-second-inputs">
              <h1 className="shop-address ">Billing address</h1>
              <p className="modal-second-input-heads pt-3">Street address</p>
              <Form.Control className="modal-inputs" type="text" placeholder="" />
              <p className="modal-second-input-heads pt-3">City</p>
              <Form.Control className="modal-inputs" type="text" placeholder="" />
              <p className="modal-second-input-heads pt-3">Postal code/state</p>
              <Form.Control className="modal-inputs" type="text" placeholder="" />
            </div>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-end">
              <button className="save-btnn-modal px-5">Save</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddressModal;
