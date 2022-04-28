import { Form } from 'react-bootstrap';
// import Headphone from '../../assets/channel/modal_headphone_photo.png';
import { IconArrowModal } from '../common/Icons';
import { t } from '../../utils/transShim';
import { OrderData } from 'src/redux/orders/orderSlice';
import '../../sass/order-state-modal.scss';
import { CrossModalIcon } from '../common/Icons';
import { useAppSelector, useAppDispatch } from '../../custom-hooks/reduxCustomHooks';
import { useEffect, useState } from 'react';
import { loadAddressFromOrderLine } from '../../redux/orders/orderThunk';
interface Props {
  data: { [key: string]: OrderData };
}
const OrderDetailsContent = (props: Props) => {
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
  const { data } = props;
  const [orderBillingAddress, setOrderBillingAddress] = useState(object);
  const [orderShippingAddress, setOrderShippingAddress] = useState(object);
  // const orderImage = data.imageUrl;
  console.log('The data from  api', data);

  const [orderNumber] = useState(data.id);
  const { ordersAddress } = useAppSelector((state) => state.orderAddress);
  console.log('The id is ', data.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAddressFromOrderLine(orderNumber));
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
          <div className="row justify-content-between">
            <div className="col-12 col-xl-6" style={{ backgroundColor: '#f2f8ff', padding: '10px' }}>
              <div className="row shipping-billing-container">
                {/* SHIPPING ADDRESSS  */}
                {/* <div className="col-6 col-lg-5">
                  <div className="heading-addresses  ">
                    <h3 className="heading-details">{t('OrderDetails.ShippingAddress')}</h3>
                    <p className="heading-addresses"> {t('OrderDetails.StreetAddress')}</p>
                    <Form.Control className="white-input" type="text" value="" />
                    <p className="heading-addresses"> {t('OrderDetails.City')}</p>
                    <Form.Control className="white-input" type="text" value="" />
                    <p className="heading-addresses"> {t('OrderDetails.PostalCodeState')}</p>
                    <Form.Control className="white-input" type="text" value="" />
                  </div>
                </div> */}
                {/* BILLING ADDRESSS  */}
                {/* <div className="col-6 col-lg-6">
                  <div className="heading-addresses">
                    <h3 className="heading-details"> {t('OrderDetails.Billingaddress')}</h3>
                    <p className="heading-addresses">{t('OrderDetails.StreetAddress')}</p>
                    <Form.Control className="white-input" type="text" value="" />
                    <p className="heading-addresses">{t('OrderDetails.City')}</p>
                    <Form.Control className="white-input" type="text" value="" />
                    <p className="heading-addresses">{t('OrderDetails.PostalCodeState')}</p>
                    <Form.Control className="white-input" type="text" value="" />
                  </div>
                </div> */}
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="large-input">
                    <h3 className="heading-details">{t('OrderDetails.ShippingAddress')}</h3>
                    <p className="heading-addresses">{t('OrderDetails.Name')}</p>
                    <Form.Control className="blue-input" type="text" value={orderBillingAddress.firstName} disabled />
                  </div>
                </div>
                <div className="col-6">
                  <div className="large-input">
                    <h3 className="heading-details">{t('OrderDetails.Billingaddress')}</h3>
                    <p className="heading-addresses">{t('OrderDetails.Name')}</p>
                    <Form.Control className="blue-input" type="text" value={orderShippingAddress.firstName} disabled />
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
                    <Form.Control className="blue-input" type="text" value={orderBillingAddress.address1} disabled />
                  </div>
                </div>
                <div className="col-6">
                  <div className="large-input">
                    <p className="heading-addresses">{t('OrderDetails.AddressLineOne')}</p>
                    <Form.Control className="blue-input" type="text" value={orderShippingAddress.address1} disabled />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <div className="large-input">
                    <p className="heading-addresses">{t('OrderDetails.AddressLineTwo')}</p>
                    <Form.Control className="blue-input" type="text" value={orderBillingAddress.address2} disabled />
                  </div>
                </div>
                <div className="col-6">
                  <div className="large-input">
                    <p className="heading-addresses">{t('OrderDetails.AddressLineTwo')}</p>
                    <Form.Control className="blue-input" type="text" value={orderShippingAddress.address2} disabled />
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
                    <Form.Control className="blue-input" type="text" value={orderBillingAddress.province} disabled />
                  </div>
                </div>
                <div className="col-6">
                  <div className="large-input">
                    <p className="heading-addresses">{t('OrderDetails.State')}</p>
                    <Form.Control className="blue-input" type="text" value={orderShippingAddress.province} disabled />
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
                    <Form.Control className="blue-input" type="text" value={orderShippingAddress.country} disabled />
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
                    <Form.Control className="blue-input" type="text" value={JSON.stringify(data.reference)} disabled />
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
                  {/* <div className="d-flex mt-4 ">
                    <div className="small-input">
                      <h3 className="heading-details">{t('OrderDetails.Quantity')}</h3>
                      <Form.Control className="blue-input" type="text" value={JSON.stringify(data.quantity)} />
                    </div>
                    <div className="small-input">
                      <h3 className="heading-details">{t('OrderDetails.Sold')}</h3>
                      <Form.Control className="blue-input" type="text" value="123" />
                    </div>
                  </div> */}
                </div>
                <div className="col-6 d-flex justify-content-center">
                  {/* <img src={orderImage} className="product-img" /> */}
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
                      <Form.Control className="blue-input" type="text" value={JSON.stringify(data.quantity)} disabled />
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
                        value={JSON.stringify(data.sourcePrice)}
                        disabled
                      />
                    </div>
                    <div className="small-input ">
                      <h3 className="heading-details">{t('OrderDetails.Fees')}</h3>
                      <Form.Control className="blue-input" type="text" value={JSON.stringify(data.fees)} disabled />
                    </div>
                    <div className="small-input ">
                      <h3 className="heading-details">{t('OrderDetails.Profit')}</h3>
                      <Form.Control className="blue-input" type="text" value={JSON.stringify(data.quantity)} disabled />
                    </div>
                    <div className="small-input ">
                      <h3 className="heading-details">{t('OrderDetails.Margin')}</h3>
                      <Form.Control className="blue-input" type="text" value={JSON.stringify(data.quantity)} disabled />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="row justify-content-between">
              <div className="col-12 col-xl-5">
                <div className="sourceurl">
                  <h3 className="heading-details">{t('OrderDetails.SourceURL')}</h3>
                  <a href="/">https://www.source-url.com/list/item/item-name</a>
                </div>
              </div>
              <div className="col-12 col-xl-6 d-flex">
                <div className="row">
                  <div className="col col-lg-auto col-xl-2">
                    <h3 className="heading-details">{t('OrderDetails.Sell')}</h3>
                    <Form.Control className="blue-input" type="text" value="€40.00" />
                  </div>
                  <div className="col col-lg-auto col-xl-2">
                    <h3 className="heading-details">{t('OrderDetails.Cost')}</h3>
                    <Form.Control className="blue-input" type="text" value="123" />
                  </div>
                  <div className="col col-lg-auto col-xl-2">
                    <h3 className="heading-details">{t('OrderDetails.Fees')}</h3>
                    <Form.Control className="blue-input" type="text" value="€34.99" />
                  </div>
                  <div className="col col-lg-auto col-xl-2">
                    <h3 className="heading-details">{t('OrderDetails.Profit')}</h3>
                    <Form.Control className="blue-input" type="text" value="€1.00" />
                  </div>
                  <div className="col col-lg-auto col-xl-2">
                    <h3 className="heading-details">{t('OrderDetails.Margin')}</h3>
                    <Form.Control className="blue-input" type="text" value="123" />
                  </div>

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
                    <div className="small-input">
                      <h3 className="heading-details">{t('OrderDetails.Sold')}</h3>
                      <Form.Control
                        className="blue-input"
                        type="text"
                        value={JSON.stringify(data.channelPrice)}
                        disabled
                      />
                    </div>
                    <div className="small-input">
                      <h3 className="heading-details">{t('OrderDetails.Cost')}</h3>
                      <Form.Control
                        className="blue-input"
                        type="text"
                        value={JSON.stringify(data.sourcePrice)}
                        disabled
                      />
                    </div>
                    <div className="small-input">
                      <h3 className="heading-details">{t('OrderDetails.Fees')}</h3>
                      <Form.Control
                        className="blue-input"
                        type="text"
                        value={JSON.stringify(data.fees)}
                        disabled
                      />
                    </div>
                    <div className="small-input">
                      <h3 className="heading-details">{t('OrderDetails.Profit')}</h3>
                      <Form.Control
                        className="blue-input"
                        type="text"
                        value={JSON.stringify(data.quantity)}
                        disabled
                      />
                    </div>
                    <div className="small-input">
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
            </div> */}
            <div className="row">
              <div className="go-back-orders-container col">
                <IconArrowModal />
                <div
                  onClick={() => {
                    // setOrderDetailsModalShow(false);
                    // setShow(true);
                  }}
                  className="go-back-orders"
                >
                  <h3> {t('OrderDetails.OrderState')}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderDetailsContent;
