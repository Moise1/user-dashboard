import { Modal, Form } from 'react-bootstrap';
import Headphone from '../../assets/channel/modal_headphone_photo.png';
import { AoIconHead, CrossModalIcon, IconArrowModal } from '../common/Icons';
import AddressModal from './AddressModal';
import { t } from '../../global/transShim';
import '../../sass/light-theme/order-details-modal.scss';

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

  return (
    <div className="modal-first">
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
            <div className="flex-sm-row order-details-header">
              <h1 className="modal-title">{t('OrderDetails.OrderDetails')}</h1>
              <button className="autoordering-state">
                <AoIconHead />
                <span>{t('OrderDetails.AOEnabled')}</span>
              </button>
              <span
                className="cross-round-iconModal"
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

        <Modal.Body className="order-details-body">
          <div className=" modals-inputs">
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-12 col-xl-6">
                  <div className="row ">
                    <AddressModal
                      handleCloseAllModals={handleCloseAllModals}
                      setAddressModalShow={setAddressModalShow}
                    />
                  </div>

                  <div className="row my-4">
                    <div className="col-6">
                      <h1 className="heading-details">{t('OrderDetails.Sale')}</h1>
                      <Form.Control className="modal-inputs" type="text" placeholder="123" />
                    </div>
                    <div className="col-6">
                      <h1 className="heading-details">{t('OrderDetails.ChannelItem')}</h1>
                      <Form.Control className="modal-inputs" type="text" placeholder="Channel item name" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <h1 className="heading-details">{t('OrderDetails.Reference')}</h1>
                      <Form.Control className="modal-inputs" type="text" placeholder="123" />
                    </div>
                    <div className="col-6 col-md-5">
                      <h1 className=" heading-details ">{t('OrderDetails.BuyerUsername')}</h1>
                      <Form.Control className="modal-inputs" type="text" placeholder="john doe" />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xl-6">
                  <div className="row">
                    <div className="col-6">
                      <div className="">
                        <h1 className="heading-details mt-4 mt-xl-0">{t('OrderDetails.NameOfProduct')}</h1>
                        <Form.Control className="modal-inputs" type="text" placeholder="123" />
                      </div>
                      <div className="d-flex mt-4 ">
                        <div className="w-82  mr-3">
                          <h1 className="heading-details">{t('OrderDetails.Quantity')}</h1>
                          <Form.Control className="modal-inputs" type="text" placeholder="123" />
                        </div>
                        <div className="w-82">
                          <h1 className="heading-details">{t('OrderDetails.Sold')}</h1>
                          <Form.Control className="modal-inputs" type="text" placeholder="123" />
                        </div>
                      </div>

                      <div className="mt-4 w-179">
                        <h1 className="heading-details">{t('OrderDetails.DateOfOrder')} </h1>
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
                            <h1 className="heading-details">{t('OrderDetails.Sell')}</h1>
                            <Form.Control className="modal-inputs" type="text" placeholder="€40.00" />
                          </div>
                          <div className="col col-lg-auto col-xl-2 px-2">
                            <h1 className="heading-details">{t('OrderDetails.Cost')}</h1>
                            <Form.Control className="modal-inputs" type="text" placeholder="123" />
                          </div>
                          <div className="col col-lg-auto col-xl-2 px-2">
                            <h1 className="heading-details">{t('OrderDetails.Fees')}</h1>
                            <Form.Control className="modal-inputs" type="text" placeholder="€34.99" />
                          </div>
                          <div className="col col-lg-auto col-xl-2 px-2">
                            <h1 className="heading-details">{t('OrderDetails.Profit')}</h1>
                            <Form.Control className="modal-inputs" type="text" placeholder="€1.00" />
                          </div>
                          <div className="col col-lg-auto col-xl-2 px-2">
                            <h1 className="heading-details">{t('OrderDetails.Margin')}</h1>
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
                        <h1 className="heading-details">{t('OrderDetails.Sell')}</h1>
                        <Form.Control className="modal-inputs" type="text" placeholder="€40.00" />
                      </div>
                      <div className="col col-lg-auto col-xl-2 px-2">
                        <h1 className="heading-details">{t('OrderDetails.Cost')}</h1>
                        <Form.Control className="modal-inputs" type="text" placeholder="123" />
                      </div>
                      <div className="col col-lg-auto col-xl-2 px-2">
                        <h1 className="heading-details">{t('OrderDetails.Fees')}</h1>
                        <Form.Control className="modal-inputs" type="text" placeholder="€34.99" />
                      </div>
                      <div className="col col-lg-auto col-xl-2 px-2">
                        <h1 className="heading-details">{t('OrderDetails.Profit')}</h1>
                        <Form.Control className="modal-inputs" type="text" placeholder="€1.00" />
                      </div>
                      <div className="col col-lg-auto col-xl-2 px-2">
                        <h1 className="heading-details">{t('OrderDetails.Margin')}</h1>
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
