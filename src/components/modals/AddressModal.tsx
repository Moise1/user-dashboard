import React from 'react';
import { Form } from 'react-bootstrap';
import { CrossModalIcon, IconEdit } from '../common/Icons';

interface Props {
  // setAddressModalShow: (value: boolean) => void;
  handleCloseAllModals: () => void;
}

const AddressModal = (props: Props) => {
  const { handleCloseAllModals } = props;

  return (
    <>
      <div className="">
        <div className="row justify-content-between">
          <div className="col-7">
            <div className="pb-2 d-flex justify-content-between">
              <IconEdit />
              <span className="cursor-pointer">
                <CrossModalIcon />
              </span>
            </div>
            <div className="ship-bill-box">
              <div className="d-flex justify-content-between p-3">
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
          <div className="col-7 d-flex justify-content-end mt-3">
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
