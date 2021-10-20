import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import Headphone from '../../assets/channel/modal_headphone_photo.png';
import { AoIconHead, CrossModalIcon, IconArrowModal, IconEdit } from '../common/Icons';
import AddressModal from './AddressModal';

interface Props {
  addressModalShow: boolean;
  orderDetailsModalShow: boolean;
  setShow: (value: boolean) => void;
  setAddressModalShow: (value: boolean) => void;
  setOrderDetailsModalShow: (value: boolean) => void;
  handleCloseAllModals: () => void;
}

const OrderDetailsModal = (props: Props) => {
  const {
    setAddressModalShow,
    addressModalShow,
    setOrderDetailsModalShow,
    orderDetailsModalShow,
    handleCloseAllModals,
    setShow
  } = props;

  console.log(setShow);
  console.log(addressModalShow);

  return (
    <div className="modal-first ">
      <Modal
        className="modal-page"
        show={orderDetailsModalShow}
        onHide={() => setOrderDetailsModalShow(false)}
        size="xl"
        centered
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        {addressModalShow ? (
          ''
        ) : (
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              <div className="d-flex flex-sm-row  flex-column  ">
                <h1 className="head-part-one mr-5">Order Details</h1>
                <button className="head-part-second align-items-center   d-flex ">
                  <AoIconHead />

                  <span className="px-2 ">AO Enabled</span>
                </button>
                <span
                  className="cursor-pointer cross-round-iconModal"
                  onClick={() => {
                    setAddressModalShow(false);
                    setOrderDetailsModalShow(false);
                  }}
                >
                  <CrossModalIcon />
                </span>
              </div>
            </Modal.Title>
          </Modal.Header>
        )}

        <Modal.Body>
          {addressModalShow ? (
            <AddressModal handleCloseAllModals={handleCloseAllModals} />
          ) : (
            <div className="p-4 modals-inputs">
              <div className="row justify-content-between">
                <div className="col-12 col-xl-5 modal-head-box">
                  <div className="row ">
                    <div className="ship-bill-box d-flex flex-column flex-sm-row  py-3 px-2">
                      <div
                        className="col-2 pl-0 d-flex align-items-center cursor-pointer"
                        onClick={() => setAddressModalShow(true)}
                      >
                        <span>
                          <IconEdit />
                        </span>
                        <span className="edit-btnn">Edit</span>
                      </div>

                      <div className="col-12 col-md-5 px-0 pt-4 pb-3">
                        <h1 className="shop-address ">Shipping address</h1>
                        <p className="content-shop-address mb-0">156 Harvest Ln,</p>
                        <p className="content-shop-address mb-0">Phoenixville, PA, 19460</p>
                        <p className="content-shop-address mb-0">US</p>
                      </div>
                      <div className="col-12 col-md-6 pt-4 pb-3">
                        <h1 className="shop-address">Billing address</h1>
                        <p className="content-shop-address mb-0">156 Harvest Ln,</p>
                        <p className="content-shop-address mb-0">Phoenixville, PA, 19460</p>
                        <p className="content-shop-address mb-0">US</p>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-5">
                    <div className="col-12 col-md-6 pr-0">
                      <h1 className="sale-head">Sale</h1>
                      <Form.Control className="modal-inputs" type="text" placeholder="123" />
                    </div>
                    <div className="col-12 col-md-6 pr-0">
                      <h1 className="sale-head   mt-4 mt-md-0">Channel item</h1>
                      <Form.Control className="modal-inputs" type="text" placeholder="Channel item name" />
                    </div>
                  </div>
                  <div className="row mt-4 ">
                    <div className="col-12 col-md-6 pr-0">
                      <h1 className="sale-head">Reference</h1>
                      <Form.Control className="modal-inputs" type="text" placeholder="123" />
                    </div>
                    <div className="col-12 col-md-5 mt-4 mt-md-0 pr-0">
                      <h1 className=" sale-head ">Buyer username</h1>
                      <Form.Control className="modal-inputs   " type="text" placeholder="john doe" />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-xl-6 pr-0">
                      <div className="">
                        <h1 className="sale-head mt-4 mt-xl-0">Name of product</h1>
                        <Form.Control className="modal-inputs" type="text" placeholder="123" />
                      </div>
                      <div className="d-flex mt-4 ">
                        <div className="w-82  mright-15">
                          <h1 className=" sale-head">Quantity</h1>
                          <Form.Control className="modal-inputs" type="text" placeholder="123" />
                        </div>
                        <div className="w-82">
                          <h1 className="sold-head">Sold</h1>
                          <Form.Control className="modal-inputs" type="text" placeholder="123" />
                        </div>
                      </div>

                      <div className="mt-4 w-179">
                        <h1 className="sale-head">Date of order</h1>
                        <Form.Control className="modal-inputs" type="text" placeholder="123" />
                      </div>
                    </div>
                    <div className="col-12 pr-0 d-flex justify-content-center col-xl-6 mt-4 mt-lg-0">
                      <img src={Headphone} style={{ width: '192px ', height: '249px' }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-between">
                <div className="col-12 col-xl-5 pr-0 ">
                  <h1 className="source-url mt-4 ">Source URL</h1>
                  <Form.Control id="source-urls" type="text" placeholder="" />
                </div>
                <div className="col-12 col-xl-6 d-flex pr-0">
                  <div className="row">
                    <div className="col-4  col-lg-1"></div>
                    <div className="col-4  col-lg-2">
                      <h1 className="sale-head mt-4">Sell</h1>
                      <Form.Control className="modal-inputs w-76" type="text" placeholder="€40.00" />
                    </div>
                    <div className="col-4  col-lg-2">
                      <h1 className="sale-head mt-4">Cost</h1>
                      <Form.Control className="modal-inputs w-76" type="text" placeholder="123" />
                    </div>
                    <div className="col-4  col-lg-2">
                      <h1 className="sale-head mt-4">Fees</h1>
                      <Form.Control className="modal-inputs w-76" type="text" placeholder="€34.99" />
                    </div>
                    <div className="col-4  col-lg-2">
                      <h1 className="sale-head mt-4">Profit</h1>
                      <Form.Control className="modal-inputs w-76" type="text" placeholder="€1.00" />
                    </div>
                    <div className="col-4  col-lg-2">
                      <h1 className="sale-head mt-4">margin</h1>
                      <Form.Control className="modal-inputs w-76" type="text" placeholder="123" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-5 d-flex align-items-center">
                  <IconArrowModal />

                  <div
                    className="btnn-in-model order-details-back-text cursor-pointer"
                    onClick={() => setAddressModalShow(true)}
                  >
                    <span>Order State Process</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OrderDetailsModal;
