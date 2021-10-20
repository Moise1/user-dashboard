import React from 'react';
import { Form } from 'react-bootstrap';
import { CrossModalIcon, IconEdit } from '../common/Icons';

interface Props {
  setAddressModalShow: (value: boolean) => void;
  handleCloseAllModals: () => void;
}

const AddressModal = (props: Props) => {
  const { handleCloseAllModals, setAddressModalShow } = props;

  return (
    <>
      <div className="ship-bill-box">
        <div className="row justify-content-between">
          <div className="col-10">
            <div className="p-3 d-flex justify-content-between">
              <IconEdit />
              <span className="cursor-pointer" onClick={() => setAddressModalShow(false)}>
                <CrossModalIcon />
              </span>
            </div>
            <div className="">
              <div className="d-flex flex-column flex-lg-row justify-content-between p-3">
                {/* SHIPPING ADDRESSS  */}
                <div className="col-12 col-lg-5">
                  <div className="modal-second-inputs  ">
                    <h1 className="shop-address ">Shipping address</h1>
                    <p className="modal-second-input-heads pt-3">Street address</p>
                    <Form.Control className="modal-inputs" type="text" placeholder="" />
                    <p className="modal-second-input-heads pt-3">City</p>
                    <Form.Control className="modal-inputs" type="text" placeholder="" />
                    <p className="modal-second-input-heads pt-3">Postal code/state</p>
                    <Form.Control className="modal-inputs" type="text" placeholder="" />
                  </div>
                </div>
                {/* BILLING ADDRESSS  */}
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
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-10 d-flex justify-content-end my-3">
            <button className="save-btnn-modal px-5" onClick={() => handleCloseAllModals()}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressModal;
