import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import Headphone from '../../assets/channel/modal_headphone_photo.png';
import { AoIconHead, CrossModalIcon, IconArrowModal, IconEdit } from '../common/Icons';
import AddressModal from './AddressModal';
import { t } from '../../global/transShim';

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
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            <div className="d-flex flex-sm-row  flex-column  ">
              <h1 className="head-part-one mr-5">{t('OrderDetails.OrderDetails')}</h1>
              <button className="head-part-second align-items-center   d-flex ">
                <AoIconHead />
                <span className="px-2 ">{t('OrderDetails.AOEnabled')}</span>
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

        <Modal.Body className="p-2 p-sm-3">
          <div className=" modals-inputs">
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-12 col-xl-6">
                  <div className="row ">
                    {/* SHIPPING AND BILLING ADRESS TEXT  */}
                    {addressModalShow ? (
                      <AddressModal
                        handleCloseAllModals={handleCloseAllModals}
                        setAddressModalShow={setAddressModalShow}
                      />
                    ) : (
                      <div className="col-12">
                        <div className="ship-bill-box d-flex justify-content-around flex-column flex-sm-row  py-3 px-2">
                          <div className="d-flex  cursor-pointer" onClick={() => setAddressModalShow(true)}>
                            <span>
                              <IconEdit />
                            </span>
                            <span className="edit-btnn">{t('OrderDetails.Edit')}</span>
                          </div>

                          <div className="px-0 pt-4 pb-3">
                            <h1 className="shop-address ">{t('OrderDetails.ShippingAddress')}</h1>
                            <p className="content-shop-address mb-0">156 Harvest Ln,</p>
                            <p className="content-shop-address mb-0">Phoenixville, PA, 19460</p>
                            <p className="content-shop-address mb-0">US</p>
                          </div>
                          <div className="pt-4 pb-3">
                            <h1 className="shop-address">{t('OrderDetails.Billingaddress')}</h1>
                            <p className="content-shop-address mb-0">156 Harvest Ln,</p>
                            <p className="content-shop-address mb-0">Phoenixville, PA, 19460</p>
                            <p className="content-shop-address mb-0">US</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="row my-4">
                    <div className="col-6">
                      <h1 className="sale-head">{t('OrderDetails.Sale')}</h1>
                      <Form.Control className="modal-inputs" type="text" placeholder="123" />
                    </div>
                    <div className="col-6">
                      <h1 className="sale-head">{t('OrderDetails.ChannelItem')}</h1>
                      <Form.Control className="modal-inputs" type="text" placeholder="Channel item name" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <h1 className="sale-head">{t('OrderDetails.Reference')}</h1>
                      <Form.Control className="modal-inputs" type="text" placeholder="123" />
                    </div>
                    <div className="col-6 col-md-5">
                      <h1 className=" sale-head ">{t('OrderDetails.BuyerUsername')}</h1>
                      <Form.Control className="modal-inputs   " type="text" placeholder="john doe" />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xl-6">
                  <div className="row">
                    <div className="col-6 ">
                      <div className="">
                        <h1 className="sale-head mt-4 mt-xl-0">{t('OrderDetails.NameOfProduct')}</h1>
                        <Form.Control className="modal-inputs" type="text" placeholder="123" />
                      </div>
                      <div className="d-flex mt-4 ">
                        <div className="w-82  mr-3">
                          <h1 className=" sale-head">{t('OrderDetails.Quantity')}</h1>
                          <Form.Control className="modal-inputs" type="text" placeholder="123" />
                        </div>
                        <div className="w-82">
                          <h1 className="sold-head">{t('OrderDetails.Sold')}</h1>
                          <Form.Control className="modal-inputs" type="text" placeholder="123" />
                        </div>
                      </div>

                      <div className="mt-4 w-179">
                        <h1 className="sale-head">{t('OrderDetails.DateOfOrder')} </h1>
                        <Form.Control className="modal-inputs" type="text" placeholder="1/9/2021" />
                      </div>
                    </div>
                    <div className="col-6 pr-0 d-flex justify-content-center">
                      <img src={Headphone} className="headphone-img-style" />
                    </div>
                  </div>

                  {addressModalShow ? (
                    <div className="row flex-column ">
                      <div className="col-12  pr-0 ">
                        <h1 className="source-url mt-4 ">{t('OrderDetails.SourceURL')}</h1>
                        <Form.Control
                          className="source-url-input"
                          id="source-urls"
                          type="text"
                          placeholder="https://www.source-url.com/list/item/item-name"
                        />
                      </div>
                      <div className="col-12  d-flex mt-0 mt-xl-5">
                        <div className="row">
                          {/* <div className="col-4 col-lg-auto col-xl-1"></div> */}
                          <div className="col col-lg-auto col-xl-2 px-2">
                            <h1 className="sale-head mt-4">{t('OrderDetails.Sell')}</h1>
                            <Form.Control className="modal-inputs" type="text" placeholder="€40.00" />
                          </div>
                          <div className="col col-lg-auto col-xl-2 px-2">
                            <h1 className="sale-head mt-4">{t('OrderDetails.Cost')}</h1>
                            <Form.Control className="modal-inputs" type="text" placeholder="123" />
                          </div>
                          <div className="col col-lg-auto col-xl-2 px-2">
                            <h1 className="sale-head mt-4">{t('OrderDetails.Fees')}</h1>
                            <Form.Control className="modal-inputs" type="text" placeholder="€34.99" />
                          </div>
                          <div className="col col-lg-auto col-xl-2 px-2">
                            <h1 className="sale-head mt-4">{t('OrderDetails.Profit')}</h1>
                            <Form.Control className="modal-inputs" type="text" placeholder="€1.00" />
                          </div>
                          <div className="col col-lg-auto col-xl-2 px-2">
                            <h1 className="sale-head mt-4">{t('OrderDetails.Margin')}</h1>
                            <Form.Control className="modal-inputs" type="text" placeholder="123" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              {addressModalShow ? (
                ''
              ) : (
                <div className="row justify-content-between">
                  <div className="col-12 col-xl-5 pr-0 ">
                    <h1 className="source-url mt-4 ">{t('OrderDetails.SourceURL')}</h1>
                    <Form.Control
                      className="source-url-input"
                      id="source-urls"
                      type="text"
                      placeholder="https://www.source-url.com/list/item/item-name"
                    />
                  </div>
                  <div className="col-12 col-xl-6 d-flex pr-0">
                    <div className="row">
                      {/* <div className="col-4 col-lg-auto col-xl-1"></div> */}
                      <div className="col col-lg-auto col-xl-2 px-2">
                        <h1 className="sale-head mt-4">{t('OrderDetails.Sell')}</h1>
                        <Form.Control className="modal-inputs" type="text" placeholder="€40.00" />
                      </div>
                      <div className="col col-lg-auto col-xl-2 px-2">
                        <h1 className="sale-head mt-4">{t('OrderDetails.Cost')}</h1>
                        <Form.Control className="modal-inputs" type="text" placeholder="123" />
                      </div>
                      <div className="col col-lg-auto col-xl-2 px-2">
                        <h1 className="sale-head mt-4">{t('OrderDetails.Fees')}</h1>
                        <Form.Control className="modal-inputs" type="text" placeholder="€34.99" />
                      </div>
                      <div className="col col-lg-auto col-xl-2 px-2">
                        <h1 className="sale-head mt-4">{t('OrderDetails.Profit')}</h1>
                        <Form.Control className="modal-inputs" type="text" placeholder="€1.00" />
                      </div>
                      <div className="col col-lg-auto col-xl-2 px-2">
                        <h1 className="sale-head mt-4">{t('OrderDetails.Margin')}</h1>
                        <Form.Control className="modal-inputs" type="text" placeholder="123" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="row">
                <div className="col mt-5 d-flex align-items-center">
                  <IconArrowModal />

                  <div
                    onClick={() => {
                      setOrderDetailsModalShow(false);
                      setShow(true);
                    }}
                    className="btnn-in-model order-details-back-text cursor-pointer"
                  >
                    <span> {t('OrderDetails.OrderStateProcess')}</span>
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

export default OrderDetailsModal;