import React from 'react';
import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Headphone from '../../assets/channel/modal_headphone_photo.png';

const OrderDetails = () => {
  const [show, setShow] = useState(false);

  return (
    <div className=" modal-first ">
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
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            <div className="d-flex ">
              <div className="head-part-one mr-5">Order Details</div>
              <div className="head-part-second">
                <svg
                  id="Group_308"
                  data-name="Group 308"
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                >
                  <path id="Path_26" data-name="Path 26" d="M0,0H26V26H0Z" fill="none" />
                  <circle
                    id="Ellipse_9"
                    data-name="Ellipse 9"
                    cx="9.912"
                    cy="9.912"
                    r="9.912"
                    transform="translate(2.87 2.87)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                  <path
                    id="Path_27"
                    data-name="Path 27"
                    d="M9,12.189l2.189,2.189L15.566,10"
                    transform="translate(0.717 0.811)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
                <span>AO Enabled</span>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-4 modals-inputs">
            <div className="row justify-content-between">
              <div className="col-12 col-xl-5 modal-head-box ">
                <div className="row flex-colimn flex-sm-row ship-bill-box">
                  <div className="col-2 d-flex">
                    <svg
                      id="Group_41"
                      data-name="Group 41"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path id="Path_31" data-name="Path 31" d="M0,0H24V24H0Z" fill="none" />
                      <path
                        id="Path_32"
                        data-name="Path 32"
                        d="M9,7H6A2,2,0,0,0,4,9v9a2,2,0,0,0,2,2h9a2,2,0,0,0,2-2V15"
                        fill="none"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                      <path
                        id="Path_33"
                        data-name="Path 33"
                        d="M9,15h3l8.5-8.5a2.121,2.121,0,0,0-3-3L9,12v3"
                        fill="none"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                      <line
                        id="Line_24"
                        data-name="Line 24"
                        x2="3"
                        y2="3"
                        transform="translate(16 5)"
                        fill="none"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <span className="edit-btnn mt-1">Edit</span>
                  </div>
                  <div className="col-12 col-md-5 pt-4  ">
                    <h1 className="shop-address ">Shipping address</h1>
                    <p className="content-shop-address">156 Harvest Ln,</p>
                    <p className="content-shop-address">Phoenixville, PA, 19460</p>
                    <p className="content-shop-address">US</p>
                  </div>
                  <div className="col-12 col-md-5 pt-4  ">
                    <h1 className="shop-address">Billing address</h1>
                    <p className="content-shop-address">156 Harvest Ln,</p>
                    <p className="content-shop-address">Phoenixville, PA, 19460</p>
                    <p className="content-shop-address">US</p>
                  </div>
                </div>

                <div className="row mt-5 ">
                  <div className="col-12 col-md-6">
                    <h1 className="sale-head">Sale</h1>
                    <Form.Control className="modal-inputs" type="text" placeholder="123" />
                  </div>
                  <div className="col-12 col-md-6 ">
                    <h1 className="sale-head   mt-4 mt-md-0">Channel item</h1>
                    <Form.Control className="modal-inputs" type="text" placeholder="Channel item name" />
                  </div>
                </div>
                <div className="row mt-4 ">
                  <div className="col-12 col-md-6">
                    <h1 className="sale-head">Reference</h1>
                    <Form.Control className="modal-inputs" type="text" placeholder="123" />
                  </div>
                  <div className="col-12 col-md-5 mt-4 mt-md-0">
                    <h1 className=" sale-head ">Buyer username</h1>
                    <Form.Control className="modal-inputs   " type="text" placeholder="john doe" />
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-6">
                <div className="row">
                  <div className="col-12 col-xl-6">
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
                        <h1 className="sale-head">Sold</h1>
                        <Form.Control className="modal-inputs" type="text" placeholder="123" />
                      </div>
                    </div>

                    <div className="mt-4 w-179">
                      <h1 className="sale-head">Date of order</h1>
                      <Form.Control className="modal-inputs" type="text" placeholder="123" />
                    </div>
                  </div>
                  <div className="col-12 col-xl-6 mt-4 mt-lg-0">
                    <img src={Headphone} style={{ width: '60% ' }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-between">
              <div className="col-12 col-xl-5">
                <h1 className="sale-head mt-4">Source URL</h1>
                <Form.Control className="modal-inputs" type="text" placeholder="123" />
              </div>
              <div className="col-12 col-xl-6 d-flex">
                <div className="row">
                  <div className="col-6 col-md-4 col-xl-2"></div>
                  <div className="col-6 col-md-4 col-xl-2">
                    <h1 className="sale-head mt-4">Sell</h1>
                    <Form.Control className="modal-inputs" type="text" placeholder="€40.00" />
                  </div>
                  <div className="col-6 col-md-4 col-xl-2">
                    <h1 className="sale-head mt-4">Cost</h1>
                    <Form.Control className="modal-inputs" type="text" placeholder="123" />
                  </div>
                  <div className="col-6 col-md-4 col-xl-2">
                    <h1 className="sale-head mt-4">Fees</h1>
                    <Form.Control className="modal-inputs" type="text" placeholder="€34.99" />
                  </div>
                  <div className="col-6 col-md-4 col-xl-2">
                    <h1 className="sale-head mt-4">Profit</h1>
                    <Form.Control className="modal-inputs" type="text" placeholder="€1.00" />
                  </div>
                  <div className="col-6 col-md-4 col-xl-2">
                    <h1 className="sale-head mt-4">margin</h1>
                    <Form.Control className="modal-inputs" type="text" placeholder="123" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OrderDetails;
