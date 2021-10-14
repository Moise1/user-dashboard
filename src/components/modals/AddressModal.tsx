import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import { CrossModalIcon, IconEdit } from '../common/Icons';

interface Props {
  addressModalShow: boolean;
  setAddressModalShow: (value: boolean) => void;
  handleCloseAllModals: () => void;
}

const AddressModal = (props: Props) => {
  const { setAddressModalShow, addressModalShow, handleCloseAllModals } = props;

  return (
    <div>
      <div className="btnn-in-model order-details-back-text cursor-pointer" onClick={() => setAddressModalShow(true)}>
        <span>Order State Process</span>
      </div>

      <Modal
        className="full-model"
        show={addressModalShow}
        size="lg"
        centered
        onHide={() => setAddressModalShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header className="modal-second-head px-2" closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            <IconEdit />
            <span className="cursor-pointer cross-round-iconModal" onClick={() => setAddressModalShow(false)}>
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
              <button className="save-btnn-modal px-5" onClick={() => handleCloseAllModals()}>
                Save
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddressModal;
