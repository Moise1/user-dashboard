import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
// import Headphone from '../../assets/channel/modal_headphone_photo.png';
import { IconArrowModal, CrossModalIcon } from '../components/common/Icons';
import { t } from '../utils/transShim';
import '../sass/order-state-modal.scss';
import { useAppSelector, useAppDispatch } from '../custom-hooks/reduxCustomHooks';
import { loadAddressFromOrderLine, orderDataType } from '../redux/orders/orderThunk';
import { Spin } from 'antd';
interface Props {
  data: {
    [key: string]: orderDataType;
    imageUrl?: string | undefined;
  };
  OrderContentModalOpen: () => void;
}

const OrderDetailsContent = (props: Props) => {
  const { data, OrderContentModalOpen } = props;

  const object = {
    firstName: ' ',
    phone: ' ',
    address1: ' ',
    address2: ' ',
    city: ' ',
    zip: ' ',
    province: ' ',
    country: ' '
  };

  const [orderBillingAddress, setOrderBillingAddress] = useState(object);
  const [orderShippingAddress, setOrderShippingAddress] = useState(object);
  console.log('The data from  api', data);
  const [orderNumber] = useState(data.id);
  const { ordersAddress, loading } = useAppSelector((state) => state.orderAddress);
  console.log('The id is ', data.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAddressFromOrderLine(orderNumber!));
    setOrderBillingAddress(ordersAddress.billingAddress);
    setOrderShippingAddress(ordersAddress.shippingAddress);
  }, [data.id]);

  console.log('The billingModalAddress ', orderBillingAddress.phone);
  console.log('The shippingModalAddress ', orderShippingAddress);

  return (
    <div className="modal-first">
      <div className="flex-sm-row order-details-header">
        <h3 className="modal-title">{t('OrderDetails.OrderDetails')}</h3>
        {/* <button className="autoordering-state">
          <AoIconHead />
          <span>{t('OrderDetails.AOEnabled')}</span>
        </button> */}
        <span
          className="close-modal-icon"
          onClick={() => {
            // setOrderDetailsModalShow(false);
          }}
        >
          <CrossModalIcon />
        </span>
      </div>
      <div className=" modals-inputs">
        <div className="container">
          {loading ? (
            <Spin className="ant-spin-spinnings" />
          ) : (
            <>
              <div className="row justify-content-between">
                <div className="col-12 col-xl-6" style={{ backgroundColor: '#f2f8ff', padding: '10px' }}>
                  <div className="row shipping-billing-container"></div>
                  <div className="row">
                    <div className="col-6">
                      <div className="large-input">
                        <h3 className="heading-details">{t('OrderDetails.ShippingAddress')}</h3>
                        <p className="heading-addresses">{t('OrderDetails.Name')}</p>
                        <Form.Control
                          className="blue-input"
                          type="text"
                          value={orderBillingAddress.firstName}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="large-input">
                        <h3 className="heading-details">{t('OrderDetails.Billingaddress')}</h3>
                        <p className="heading-addresses">{t('OrderDetails.Name')}</p>
                        <Form.Control
                          className="blue-input"
                          type="text"
                          value={orderShippingAddress.firstName}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="large-input">
                        <p className="heading-addresses">{t('OrderDetails.Phone')}</p>
                        <Form.Control className="blue-input" type="text" value={orderBillingAddress.phone} disabled />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="large-input">
                        <p className="heading-addresses">{t('OrderDetails.Phone')}</p>
                        <Form.Control className="blue-input" type="text" value={orderShippingAddress.phone} disabled />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="large-input">
                        <p className="heading-addresses">{t('OrderDetails.AddressLineOne')}</p>
                        <Form.Control
                          className="blue-input"
                          type="text"
                          value={orderBillingAddress.address1}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="large-input">
                        <p className="heading-addresses">{t('OrderDetails.AddressLineOne')}</p>
                        <Form.Control
                          className="blue-input"
                          type="text"
                          value={orderShippingAddress.address1}
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="large-input">
                        <p className="heading-addresses">{t('OrderDetails.AddressLineTwo')}</p>
                        <Form.Control
                          className="blue-input"
                          type="text"
                          value={orderBillingAddress.address2}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="large-input">
                        <p className="heading-addresses">{t('OrderDetails.AddressLineTwo')}</p>
                        <Form.Control
                          className="blue-input"
                          type="text"
                          value={orderShippingAddress.address2}
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="large-input">
                        <p className="heading-addresses">{t('OrderDetails.City')}</p>
                        <Form.Control className="blue-input" type="text" value={orderBillingAddress.city} disabled />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="large-input">
                        <p className="heading-addresses">{t('OrderDetails.City')}</p>
                        <Form.Control className="blue-input" type="text" value={orderShippingAddress.city} disabled />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="large-input">
                        <p className="heading-addresses">{t('OrderDetails.PostalCodeState')}</p>
                        <Form.Control className="blue-input" type="text" value={orderBillingAddress.zip} disabled />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="large-input">
                        <p className="heading-addresses">{t('OrderDetails.PostalCodeState')}</p>
                        <Form.Control className="blue-input" type="text" value={orderShippingAddress.zip} disabled />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="large-input">
                        <p className="heading-addresses">{t('OrderDetails.State')}</p>
                        <Form.Control
                          className="blue-input"
                          type="text"
                          value={orderBillingAddress.province}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="large-input">
                        <p className="heading-addresses">{t('OrderDetails.State')}</p>
                        <Form.Control
                          className="blue-input"
                          type="text"
                          value={orderShippingAddress.province}
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="large-input">
                        <p className="heading-addresses">{t('OrderDetails.Country')}</p>
                        <Form.Control className="blue-input" type="text" value={orderBillingAddress.country} disabled />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="large-input">
                        <p className="heading-addresses">{t('OrderDetails.Country')}</p>
                        <Form.Control
                          className="blue-input"
                          type="text"
                          value={orderShippingAddress.country}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* This is next */}
                <div className="col-12 col-xl-6">
                  <div className="row">
                    <div className="col-6">
                      <div className="large-input mt-2">
                        <h3 className="heading-addresses">{t('OrderDetails.Reference')}</h3>
                        <Form.Control
                          className="blue-input"
                          type="text"
                          value={JSON.stringify(data.reference)}
                          disabled
                        />
                      </div>
                      <div className="large-input mt-2">
                        <h3 className="heading-details">{t('OrderDetails.DateOfOrder')} </h3>
                        <Form.Control className="blue-input" type="text" value={JSON.stringify(data.date)} disabled />
                      </div>

                      <div className="large-input mt-2">
                        <h3 className="heading-details mt-4 mt-xl-0">{t('OrderDetails.ChannelItem')}</h3>
                        <Form.Control
                          className="blue-input"
                          type="text"
                          value={JSON.stringify(data.channelItem)}
                          disabled
                        />
                      </div>

                      <div className="large-input mt-2">
                        <h3 className="heading-details mt-4 mt-xl-0">{t('OrderDetails.NameOfProduct')}</h3>
                        <Form.Control className="blue-input" type="text" value={JSON.stringify(data.title)} disabled />
                      </div>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                      <img src={data.imageUrl} className="product-img" />
                    </div>
                    <div className="col-12 mt-4">
                      <div className="sourceurl">
                        <h3 className="heading-details">{t('OrderDetails.SourceURL')}</h3>
                        <a href="/">
                          <Form.Control
                            className="blue-input"
                            type="text"
                            value="https://www.source-url.com/list/item/item-name"
                            disabled
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex mt-4 ">
                        <div className="small-input">
                          <h3 className="heading-details">{t('OrderDetails.Quantity')}</h3>
                          <Form.Control
                            className="blue-input"
                            type="text"
                            value={JSON.stringify(data.quantity)}
                            disabled
                          />
                        </div>
                        <div className="small-input ">
                          <h3 className="heading-details">{t('OrderDetails.Sold')}</h3>
                          <Form.Control
                            className="blue-input"
                            type="text"
                            value={JSON.stringify(data.channelPrice)}
                            disabled
                          />
                        </div>
                        <div className="small-input ">
                          <h3 className="heading-details">{t('OrderDetails.Cost')}</h3>
                          <Form.Control
                            className="blue-input"
                            type="text"
                            value={JSON.stringify(data.sourcePrice) ? JSON.stringify(data.sourcePrice) : ' - '}
                            disabled
                          />
                        </div>
                        <div className="small-input ">
                          <h3 className="heading-details">{t('OrderDetails.Fees')}</h3>
                          <Form.Control className="blue-input" type="text" value={JSON.stringify(data.fees)} disabled />
                        </div>
                        <div className="small-input ">
                          <h3 className="heading-details">{t('OrderDetails.Profit')}</h3>
                          <Form.Control
                            className="blue-input"
                            type="text"
                            value={JSON.stringify(data.quantity)}
                            disabled
                          />
                        </div>
                        <div className="small-input ">
                          <h3 className="heading-details">{t('OrderDetails.Margin')}</h3>
                          <Form.Control
                            className="blue-input"
                            type="text"
                            value={JSON.stringify(data.quantity)}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="go-back-orders-container  col">
                    <div onClick={OrderContentModalOpen} className="go-back-details">
                      <IconArrowModal />
                      <span> {t('OrderDetails.OrderDetails')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default OrderDetailsContent;