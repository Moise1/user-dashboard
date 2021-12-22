import { Modal, Form } from 'react-bootstrap';
import Headphone from '../../assets/channel/modal_headphone_photo.png';
import { AoIconHead, CrossModalIcon, IconArrowModal } from '../common/Icons';
import { t } from '../../global/transShim';
import '../../sass/light-theme/order-details-modal.scss';

interface Props {
  orderDetailsModalShow: boolean;
  setShow: (value: boolean) => void;

  setOrderDetailsModalShow: (value: boolean) => void;
  handleCloseAllModals: () => void;
}

const OrderDetailsModal = (props: Props) => {
  const { setOrderDetailsModalShow, orderDetailsModalShow, setShow } = props;

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
                className="close-modal-icon"
                onClick={() => {
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
                  <div className="row shipping-billing-container">
                    {/* SHIPPING ADDRESSS  */}
                    <div className="col-6 col-lg-5">
                      <div className="heading-addresses  ">
                        <h1 className="heading-details">{t('OrderDetails.ShippingAddress')}</h1>
                        <p className="heading-addresses"> {t('OrderDetails.StreetAddress')}</p>
                        <Form.Control className="white-input" type="text" placeholder="" />
                        <p className="heading-addresses"> {t('OrderDetails.City')}</p>
                        <Form.Control className="white-input" type="text" placeholder="" />
                        <p className="heading-addresses"> {t('OrderDetails.PostalCodeState')}</p>
                        <Form.Control className="white-input" type="text" placeholder="" />
                      </div>
                    </div>

                    {/* BILLING ADDRESSS  */}
                    <div className="col-6 col-lg-6">
                      <div className="heading-addresses">
                        <h1 className="heading-details"> {t('OrderDetails.Billingaddress')}</h1>
                        <p className="heading-addresses">{t('OrderDetails.StreetAddress')}</p>
                        <Form.Control className="white-input" type="text" placeholder="" />
                        <p className="heading-addresses">{t('OrderDetails.City')}</p>
                        <Form.Control className="white-input" type="text" placeholder="" />
                        <p className="heading-addresses">{t('OrderDetails.PostalCodeState')}</p>
                        <Form.Control className="white-input" type="text" placeholder="" />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="large-input">
                        <h1 className="heading-details">{t('OrderDetails.Sale')}</h1>
                        <Form.Control className="blue-input" type="text" placeholder="123" />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="large-input">
                        <h1 className="heading-details">{t('OrderDetails.ChannelItem')}</h1>
                        <Form.Control className="blue-input" type="text" placeholder="Channel item name" />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="large-input">
                        <h1 className="heading-details">{t('OrderDetails.Reference')}</h1>
                        <Form.Control className="blue-input" type="text" placeholder="123" />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="large-input">
                        <h1 className=" heading-details ">{t('OrderDetails.BuyerUsername')}</h1>
                        <Form.Control className="blue-input" type="text" placeholder="john doe" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xl-6">
                  <div className="row">
                    <div className="col-6">
                      <div className="large-input">
                        <h1 className="heading-details mt-4 mt-xl-0">{t('OrderDetails.NameOfProduct')}</h1>
                        <Form.Control className="blue-input" type="text" placeholder="123" />
                      </div>
                      <div className="d-flex mt-4 ">
                        <div className="small-input">
                          <h1 className="heading-details">{t('OrderDetails.Quantity')}</h1>
                          <Form.Control className="blue-input" type="text" placeholder="123" />
                        </div>
                        <div className="small-input">
                          <h1 className="heading-details">{t('OrderDetails.Sold')}</h1>
                          <Form.Control className="blue-input" type="text" placeholder="123" />
                        </div>
                      </div>

                      <div className="large-input">
                        <h1 className="heading-details">{t('OrderDetails.DateOfOrder')} </h1>
                        <Form.Control className="blue-input" type="text" placeholder="1/9/2021" />
                      </div>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                      <img src={Headphone} className="product-img" />
                    </div>
                  </div>
                </div>
                <div className="row justify-content-between">
                  <div className="col-12 col-xl-5">
                    <div className="sourceurl">
                      <h1 className="heading-details">{t('OrderDetails.SourceURL')}</h1>
                      <a href="/">https://www.source-url.com/list/item/item-name</a>
                    </div>
                  </div>
                  <div className="col-12 col-xl-6 d-flex">
                    <div className="row">
                      {/* <div className="col-4 col-lg-auto col-xl-1"></div> */}
                      <div className="col col-lg-auto col-xl-2">
                        <h1 className="heading-details">{t('OrderDetails.Sell')}</h1>
                        <Form.Control className="blue-input" type="text" placeholder="€40.00" />
                      </div>
                      <div className="col col-lg-auto col-xl-2">
                        <h1 className="heading-details">{t('OrderDetails.Cost')}</h1>
                        <Form.Control className="blue-input" type="text" placeholder="123" />
                      </div>
                      <div className="col col-lg-auto col-xl-2">
                        <h1 className="heading-details">{t('OrderDetails.Fees')}</h1>
                        <Form.Control className="blue-input" type="text" placeholder="€34.99" />
                      </div>
                      <div className="col col-lg-auto col-xl-2">
                        <h1 className="heading-details">{t('OrderDetails.Profit')}</h1>
                        <Form.Control className="blue-input" type="text" placeholder="€1.00" />
                      </div>
                      <div className="col col-lg-auto col-xl-2">
                        <h1 className="heading-details">{t('OrderDetails.Margin')}</h1>
                        <Form.Control className="blue-input" type="text" placeholder="123" />
                      </div>
                    </div>
                  </div>
                </div>

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
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OrderDetailsModal;
